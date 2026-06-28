import { profile } from "@/data/profile";
import { Logo } from "@/components/ui/Logo";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/SocialIcons";
import { Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card section-padding">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <Logo />
            <h3 className="mt-6 font-heading text-2xl font-bold">Let&apos;s Talk</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Full Stack Developer specializing in scalable web applications,
              business automation solutions, and premium digital products.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
                aria-label="GitHub"
              >
                <GitHubIcon size={18} />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
                aria-label="LinkedIn"
              >
                <LinkedInIcon size={18} />
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-heading text-lg font-semibold">Navigation</h3>
            <ul className="mt-4 space-y-2">
              {profile.navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-lg font-semibold">Services</h3>
            <ul className="mt-4 space-y-2">
              {profile.footerServices.map((service) => (
                <li key={service}>
                  <a
                    href="#services"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} {profile.name}. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
