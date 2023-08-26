import { Typography } from "antd";

function AuthHeader({ title, paragraph }) {
  return (
    <article style={{ marginBottom: 15 }}>
      <Typography.Title className="mb0">{title}</Typography.Title>
      <Typography.Paragraph>{paragraph}</Typography.Paragraph>
    </article>
  );
}

export default AuthHeader;
