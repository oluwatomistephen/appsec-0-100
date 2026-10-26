# Security policy

AppSec 0→100 is a static site with no backend, no accounts and no data collection, but it's built to be secure and reports are welcome.

## Reporting a vulnerability

Please report privately using GitHub's **Report a vulnerability** button on this repository's **Security** tab. Please don't open a public issue for a security problem.

Include:

- what the issue is and where (file, URL or route)
- steps to reproduce, or a proof of concept
- the impact you think it has
- the browser and version you used

You'll get an acknowledgement within 7 days. This is a volunteer project, so fixes may take longer, but you'll be kept updated and credited in the fix unless you'd rather not be.

## In scope

- Anything that lets content, a URL or an imported progress file run script or inject markup in the site
- Bypasses of the Content Security Policy or Trusted Types setup
- Ways for imported files or stored progress to corrupt or leak other data
- Weaknesses in the CI and deployment workflows, such as a way for a pull request to run with write permissions
- Anything that makes the site load resources from a third party

## Out of scope

- Missing HTTP response headers that GitHub Pages doesn't allow sites to set, including `frame-ancestors` and clickjacking on pages with no sensitive actions (see "Known limits" in the README)
- Reading or editing progress in `localStorage` with access to the same device
- Vulnerabilities in the third-party labs and tools the plans link to: please report those to their own projects
- Automated scanner output without a demonstrated impact

## Testing

Please test only against a local copy (`npm run serve`) or your own fork. Don't run automated scanners or load tests against the live site.
