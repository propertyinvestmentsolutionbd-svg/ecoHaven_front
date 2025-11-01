import { Row, Col, Typography } from "antd";
import "./ImageTextSection.css";
import Image from "next/image";
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";
import Text from "antd/es/typography/Text";
export const ImageTextSection = ({
  image,
  label,
  title,
  description,
  imagePosition = "left",
}) => {
  //   const { Title, Paragraph, Text } = Typography;

  const imageContent = (
    <div className="image-section">
      <Image
        src={image}
        alt={title}
        width={100}
        height={100}
        className="section-image"
      />
    </div>
  );

  const textContent = (
    <div className="text-section">
      <Text className="section-label">{label}</Text>
      <Title level={2} className="section-title">
        {title}
      </Title>
      <Paragraph className="section-description">{description}</Paragraph>
    </div>
  );

  if (imagePosition === "top") {
    return (
      <div className="image-text-section vertical">
        {imageContent}
        {textContent}
      </div>
    );
  }

  return (
    <Row gutter={[24, 24]} align="middle" className="image-text-section">
      {imagePosition === "left" ? (
        <>
          <Col xs={24} md={12}>
            {imageContent}
          </Col>
          <Col xs={24} md={12}>
            {textContent}
          </Col>
        </>
      ) : (
        <>
          <Col xs={24} md={12}>
            {textContent}
          </Col>
          <Col xs={24} md={12}>
            {imageContent}
          </Col>
        </>
      )}
    </Row>
  );
};
