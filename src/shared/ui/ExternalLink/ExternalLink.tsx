import Link from "next/link";

interface ExternalLinkProps {
  link: string;
  content: string;
}

const ExternalLink = ({ link, content }: ExternalLinkProps) => {
  return (
    <Link href={link} target="_blank">
      {content}
    </Link>
  );
};

export default ExternalLink;
