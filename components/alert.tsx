import cn from "classnames";
import Container from "./container";
//import { EXAMPLE_PATH } from '../lib/constants'

type Props = {
  preview?: boolean;
};

const Alert = ({ preview }: Props) => {
  return (
    <div
      className={cn("border-b", {
        "bg-[hsl(var(--muted))] border-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]":
          preview,
        "bg-[hsl(var(--muted))] border-[hsl(var(--border))] text-[hsl(var(--foreground))]":
          !preview,
      })}
    >
      <Container>
        <div className="py-2 text-center text-sm">
          {preview ? (
            <>
              This page is a preview.{" "}
              <a
                href="/api/exit-preview"
                className="underline hover:text-[hsl(var(--accent))] duration-200 transition-colors"
              >
                Click here
              </a>{" "}
              to exit preview mode.
            </>
          ) : (
            <>
              Welcome to my blog{" "}
              <a
                href={`https://twitter.com/ScriptAlchemist`}
                className="underline hover:text-[hsl(var(--primary))] duration-200 transition-colors"
              >
                some say Hello on Twitter
              </a>
              .
            </>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Alert;
