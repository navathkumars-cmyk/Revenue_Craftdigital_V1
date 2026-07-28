# Deploying Revenue Craft Digital to Hostinger

This app is a Next.js 15 site with **server-side API routes** (`/api/contact`,
`/api/growth-audit`) and **dynamically generated images** (OG image, favicon).
That combination needs a real Node.js process running — it can't be exported
as plain static HTML.

## Important: your current "Premium" plan won't run this

I checked Hostinger's current documentation directly. Node.js Web App
hosting is only included on:
- **Business** shared hosting
- **Cloud Startup / Professional / Enterprise / Enterprise Plus**
- A **VPS** (any plan)

**Premium shared hosting does not include Node.js support** — it's PHP/static
hosting only. That's true even though you already have a domain and hosting
purchased there; that specific plan tier can't run this site as-is.

You have two realistic options:

| | Option A — Upgrade to Business | Option B — Get a VPS |
|---|---|---|
| What it is | Hostinger's own managed Node.js app hosting, through hPanel | A Linux server you configure yourself |
| Effort | Low — a few clicks, no server admin | Moderate — one-time server setup, shown below |
| Best if | You want the simplest path and don't mind Hostinger managing the runtime | You want full control, or plan to run more than one app |
| Domain/SSL | Handled in hPanel automatically | You set up Nginx + free Let's Encrypt SSL yourself |

**My recommendation: Option A.** You already have a Hostinger account and
domain — upgrading the hosting plan (hPanel → Billing → your hosting
subscription → Upgrade) to Business keeps everything else the same and gets
you a genuinely simple, officially-supported deploy flow for exactly this
kind of app (Hostinger even publishes their own Next.js deploy guide for
it). Go with Option B only if you specifically want VPS-level control.

Both options are documented in full below.

---

## Option A — Hostinger Business/Cloud hosting (recommended)

### 1. Upgrade your plan (if you haven't)

hPanel → **Billing** → find your current hosting subscription → **Upgrade**
→ choose **Business Web Hosting** (cheapest plan with Node.js support) or a
**Cloud** plan if you want more resources. Your domain and anything else on
the account carries over — you're just changing the hosting tier.

### 2. Push this project to GitHub

Hostinger's Node.js app hosting deploys straight from a Git repository (it
also supports uploading a `.zip` if you'd rather skip GitHub — see the note
at the end of this section). This project is already a git repo locally; it
just isn't connected to a remote yet.

```bash
git add -A
git commit -m "Prepare for Hostinger deployment"
```

Then create a new repository on GitHub (via github.com — can be private)
and push:
```bash
git remote add origin https://github.com/<your-username>/<repo-name>.git
git branch -M main
git push -u origin main
```

### 3. Create the Node.js Web App in hPanel

1. hPanel → **Websites** → **Add Website** → **Deploy Web App**.
2. Choose **Import Git Repository**, authorize GitHub access, and select
   the repo you just pushed.
3. Hostinger auto-detects Next.js and pre-fills the build settings. Confirm:
   - **Install command**: `npm ci`
   - **Build command**: `npm run build`
   - **Start command**: `npm run start -- -p $PORT`
   - **Node.js version**: 20 (LTS)

   These match this project's `package.json` exactly — nothing in the code
   needs to change for this path.

### 4. Add environment variables (only if you're wiring up integrations)

The site works with **zero environment variables** — both forms submit
successfully either way; without them, submissions just get logged
server-side instead of forwarded anywhere, since content comes from the
built-in config files. If you want live email delivery, a CRM, Google
Sheets, etc., see `INTEGRATIONS.md` in this project for the full list of
variables and what each one does, then add only the ones you're using in
the app's **Environment Variables** section in hPanel before deploying.

### 5. Deploy

Click **Deploy**. Hostinger builds and starts the app, and shows you a
live URL to confirm it's running before you point your domain at it.

### 6. Connect your domain and SSL

In the Node.js app's settings in hPanel, add your **domain** (the one you
already own) under its domain/URL section, then use hPanel's **SSL**
section to issue a free certificate and enable **Force HTTPS**. If the
domain is registered with Hostinger, this is usually automatic; if it's
registered elsewhere, point its DNS **A record** at the IP hPanel shows you
for this app.

### 7. Future updates

Push to the connected GitHub branch — Hostinger's Node.js hosting rebuilds
and redeploys automatically on every push (confirm this is enabled in the
app's settings; it's on by default for GitHub-connected apps).

### If you'd rather not use GitHub

Step 3 also offers **Upload your website files**: build locally
(`npm run build`), zip the project **excluding** `node_modules` and `.next`,
and upload the zip instead. You'll lose auto-redeploy-on-push, but
everything else is the same. There's also a **Hostinger Connector** VS
Code/Cursor extension if you'd rather deploy straight from your editor.

---

## Option B — Hostinger VPS (full control)

Use this if you specifically want a server you manage yourself rather than
Hostinger's managed Node.js platform.

### 1. Order and access the VPS

1. Order a **VPS** plan (KVM 1 is enough for a site like this).
2. Choose the **Ubuntu 22.04** OS template during setup.
3. hPanel gives you the server's **IP address** and root **SSH password**
   (or lets you upload an SSH key — preferred).
4. Connect:
   ```bash
   ssh root@YOUR_SERVER_IP
   ```

### 2. Install Node.js, PM2, and Nginx

```bash
# Node.js 20 LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

node -v   # should print v20.x
npm -v

# PM2 (keeps the app running, restarts on crash/reboot)
sudo npm install -g pm2

# Nginx (reverse proxy + SSL termination)
sudo apt-get update
sudo apt-get install -y nginx
```

### 3. Get the code onto the server

```bash
sudo mkdir -p /var/www/revenuecraft
sudo chown $USER:$USER /var/www/revenuecraft
cd /var/www/revenuecraft
git clone <your-repo-url> .
```

No GitHub remote yet? Zip the project **excluding** `node_modules` and
`.next`, upload via `scp` or Hostinger's File Manager/SFTP, and unzip on the
server instead.

### 4. Install dependencies and build

```bash
cd /var/www/revenuecraft
npm ci
npm run build
```

This project builds in `output: "standalone"` mode (`next.config.ts`),
which produces a small, self-contained server under `.next/standalone/`.
That output doesn't automatically include static assets — copy them in
after every build:

```bash
cp -r public .next/standalone/public
cp -r .next/static .next/standalone/.next/static
```

### 5. Set environment variables (only if you're wiring up integrations)

Same rule as Option A: the site works with none set. If you want to enable
any lead destination (see `INTEGRATIONS.md`), the cleanest way on a VPS is
a PM2 "ecosystem" file, since the standalone server doesn't read
`.env.local` the way `next dev` does.

Create `/var/www/revenuecraft/ecosystem.config.js`:

```js
module.exports = {
  apps: [
    {
      name: "revenuecraft",
      cwd: "/var/www/revenuecraft/.next/standalone",
      script: "server.js",
      env: {
        PORT: 3000,
        NODE_ENV: "production",
        // Only add the ones you're actually using — see .env.example
        // RESEND_API_KEY: "...",
        // RESEND_FROM_EMAIL: "...",
        // RESEND_TO_EMAIL: "...",
        // LEAD_WEBHOOK_URL: "...",
      },
    },
  ],
};
```

**Keep this file out of git** if it contains real API keys.

### 6. Start the app with PM2

```bash
cd /var/www/revenuecraft
pm2 start ecosystem.config.js
pm2 save
pm2 startup   # then run the command it prints, so PM2 survives a reboot
```

Check it's alive:
```bash
curl -I http://localhost:3000
pm2 logs revenuecraft
```

### 7. Point Nginx at it

Create `/etc/nginx/sites-available/revenuecraft`:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/revenuecraft /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 8. Point your domain at the VPS

hPanel → **Domains → DNS/Name Servers** for your domain:
- **A record**: `@` → your VPS IP address
- **A record**: `www` → your VPS IP address

(DNS changes can take minutes to a few hours to propagate.)

### 9. Add HTTPS (free, via Let's Encrypt)

```bash
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

Test renewal works: `sudo certbot renew --dry-run`.

### Redeploying after future changes

```bash
cd /var/www/revenuecraft
git pull
npm ci
npm run build
cp -r public .next/standalone/public
cp -r .next/static .next/standalone/.next/static
pm2 reload revenuecraft       # zero-downtime restart
```

---

## Before going live (either option)

Open `src/config/site.ts` and confirm `url` matches your actual domain —
it drives canonical URLs, the sitemap, and JSON-LD schema. Update and
rebuild if it doesn't.

## Post-deploy checklist

- [ ] Homepage loads at your real domain over `https://`
- [ ] `/sitemap.xml` and `/robots.txt` return valid content (not 404)
- [ ] Contact form and homepage Growth Audit form both submit successfully
- [ ] `www` and non-`www` both resolve (redirect one to the other for a
      canonical version, if you want one)
- [ ] `siteConfig.url` in `src/config/site.ts` matches the live domain
- [ ] If you wired up any lead destinations (email/CRM/webhook), submit a
      real test form and confirm the lead actually arrives
