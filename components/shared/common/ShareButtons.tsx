import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import { usePathname } from "next/navigation";

interface ShareButtonsProps {
  url?: string;
  title?: string;
}

const ShareButtons = ({ url, title = "Gran Rah" }: ShareButtonsProps) => {
  const pathname = usePathname();

  console.log("pathname", pathname);

  const shareUrl = url || `https://granrah.com${pathname}`;

  return (
    <div className="flex gap-2">
      <FacebookShareButton url={shareUrl} title={title}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>

      <TwitterShareButton url={shareUrl} title={title}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>

      <WhatsappShareButton url={shareUrl} title={title}>
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>
    </div>
  );
};

export default ShareButtons;
