/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MONGO_URI: 'mongodb+srv://Diegbys:Cumana.01@cluster0.rk94z.mongodb.net/football-pools'
  }
}

module.exports = nextConfig
