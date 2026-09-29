type Props = {
  name: string;
  picture: string;
};

const Avatar = ({ name, picture }: Props) => {
  return (
    <div className="author-avatar">
      <img
        src={picture}
        className="author-avatar-image"
        alt={name}
      />
      <div>{name}</div>
    </div>
  );
};

export default Avatar;
