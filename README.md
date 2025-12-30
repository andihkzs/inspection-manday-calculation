# Mega Step Calc - AQL Inspection Calculator

[![Netlify Status](https://api.netlify.com/api/v1/badges/559f3b0b-c206-4327-bfae-d3ff97b6ae9e/deploy-status)](https://app.netlify.com/projects/calcmandays/deploys)

A professional AQL (Acceptable Quality Limit) inspection calculator with Supabase backend integration.

## Features

- AQL calculation based on ANSI/ASQ Z1.4 standards
- Multiple PO management
- Functional test time calculations
- Calculation history with Supabase persistence
- Admin authentication
- Responsive design with modern UI

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS
- Supabase (Database & Auth)
- Lucide Icons

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables (see `.env` file):
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_APP_PASSWORD=your_app_password
```

3. Run development server:
```bash
npm run dev
```

## Deploy to Netlify

### Option 1: Deploy from Git Repository

1. Push your code to GitHub/GitLab/Bitbucket
2. Go to [Netlify](https://app.netlify.com/)
3. Click "Add new site" → "Import an existing project"
4. Connect your repository
5. Configure build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
6. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_APP_PASSWORD`
7. Click "Deploy site"

### Option 2: Deploy with Netlify CLI

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Build the project:
```bash
npm run build
```

3. Deploy to Netlify:
```bash
netlify deploy --prod
```

4. Follow the prompts and set your environment variables in the Netlify dashboard

### Option 3: Manual Deploy (Drag & Drop)

1. Build the project:
```bash
npm run build
```

2. Go to [Netlify Drop](https://app.netlify.com/drop)
3. Drag and drop the `dist` folder
4. After deployment, go to Site settings → Environment variables to add your variables

## Environment Variables

Make sure to add these environment variables in your Netlify site settings:

- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Your Supabase anonymous key
- `VITE_APP_PASSWORD` - Admin password for the application

## License

Private project
