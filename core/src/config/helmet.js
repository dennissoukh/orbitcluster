module.exports = {

    /*
    |--------------------------------------------------------------------------
    | Helmet for Fastify
    |--------------------------------------------------------------------------
    |
    | Helmet helps secure this Fastify app by setting various HTTP headers.
    | View the config options here: https://helmetjs.github.io/
    |
    */

    /**
     * Sets the Content-Security-Policy header which helps mitigate cross-site
     * scripting attacks, among other things.
     */

    contentSecurityPolicy: true,

    /**
     * Sets the Expect-CT header which helps mitigate misissued SSL
     * certificates.
     */

    expectCt: {
        maxAge: 0,
        // enforce: true,
        // reportUri: 'https://example.com/report'
    },

    /**
     * Sets the Referrer-Policy header which controls what information is set
     * in the Referer header.
     *
     * Policies are "no-referrer", "no-referrer-when-downgrade", "same-origin",
     * "origin", "strict-origin", "origin-when-cross-origin",
     * "strict-origin-when-cross-origin", or "unsafe-url"
     */

    referrerPolicy: {
        policy: 'no-referrer'
    },

    /**
     * Sets the Strict-Transport-Security header which tells browsers to
     * prefer HTTPS over insecure HTTP.
     */

    hsts: {
        maxAge: 15552000,
        includeSubDomains: true,
        preload: false
    },

    /**
     * Sets the X-Content-Type-Options header to nosniff. This mitigates MIME
     * type sniffing which can cause security vulnerabilities.
     */

    noSniff: true,

    /**
     * Sets the Origin-Agent-Cluster header, which provides a mechanism to
     * allow web applications to isolate their origins.
     */

    originAgentCluster: true,

    /**
     * Sets the X-DNS-Prefetch-Control header to help control DNS prefetching,
     * which can improve user privacy at the expense of performance.
     */

    dnsPrefetchControl: {
        allow: false
    },

    /**
     * Sets the X-Download-Options header, which is specific to Internet
     * Explorer 8. It forces potentially-unsafe downloads to be saved,
     * mitigating execution of HTML in your site's context.
     */

    ieNoOpen: false,

    /**
     * Sets the X-Frame-Options header to help you mitigate clickjacking
     * attacks.
     *
     * Actions are "deny" or "sameorigin".
     */

    frameguard: {
        action: 'sameorigin'
    },

    /**
     * Sets the X-Permitted-Cross-Domain-Policies header, which tells some
     * clients your domain's policy for loading cross-domain content.
     *
     * Permitted policies are "none", "master-only", "by-content-type", or
     * "all".
     */

    permittedCrossDomainPolicies: {
        permittedPolicies: 'none'
    },

    /**
     * Removes the X-Powered-By header, which is set by default in some
     * frameworks.
     */

    hidePoweredBy: true,

    /**
     * Disables browsers' buggy cross-site scripting filter by setting the
     * X-XSS-Protection header to 0.
     */

    xssFilter: true

}
