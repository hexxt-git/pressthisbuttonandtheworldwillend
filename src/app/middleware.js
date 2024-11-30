function middleware(req) {
    const requestHeaders = new Headers(req.headers)
  
    requestHeaders.set('request-ip', req.ip);

    console.log('req')
  
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
  }