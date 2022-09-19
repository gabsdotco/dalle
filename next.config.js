module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/explore',
        permanent: true,
      },
    ]
  },
  env: {
    API_URL: process.env.API_URL,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_GITHUB_CLIENT_ID: process.env.NEXTAUTH_GITHUB_CLIENT_ID,
    NEXTAUTH_GITHUB_CLIENT_SECRET: process.env.NEXTAUTH_GITHUB_CLIENT_SECRET,
    NEXTAUTH_GOOGLE_CLIENT_ID: process.env.NEXTAUTH_GOOGLE_CLIENT_ID,
    NEXTAUTH_GOOGLE_CLIENT_SECRET: process.env.NEXTAUTH_GOOGLE_CLIENT_SECRET,
  }
}