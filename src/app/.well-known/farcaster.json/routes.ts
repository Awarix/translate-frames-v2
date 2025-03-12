export async function GET() {
    const config = {
      "accountAssociation": {
        "header": "eyJmaWQiOjExNTM2LCJ0eXBlIjoiY3VzdG9keSIsImtleSI6IjB4NDVFMjNCMjU3ZDAwYzUyNkMxQjZjRjE4QjljNTE2MDcyOTQwRjVjMyJ9",
        "payload": "eyJkb21haW4iOiJ0cmFuc2xhdGUtZnJhbWVzLXYyLnZlcmNlbC5hcHAifQ",
        "signature": "MHhmZmI0NGZlMjgzMzVjZGFjMmYxYzlhMjI2N2M4ZTM2YTRkNGU4Njc5ZjVhYjQ5Y2ZmZDU0MzY4MTQwZTJhZGU5NTMxNDE3MTdkMjE5ZGZlMjg4MGY5YWE4Y2M1YzczNTA5MmYyZjRhZDIyNDBiY2QxNDhlYjMxYmFmNjZlOGVhNTFi"
      },
      "frame": {
        "version": "1",
        "name": "Translate Game",
        "description": "A fun game to test your language skills",
        "iconUrl": "https://translate-frames-v2.vercel.app/google-translate.svg",
        "homeUrl": "https://translate-frames-v2.vercel.app",
        "imageUrl": "https://translate-frames-v2.vercel.app/google-translate.svg",
        "buttonTitle": "Dare to Play?",
        "splashImageUrl": "https://frames-v2.vercel.app/splash.png",
        "splashBackgroundColor": "#eeccff",
        "webhookUrl": "https://translate-frames-v2.vercel.app/api/webhook"
      }
    };
  
    return Response.json(config);
  }
  