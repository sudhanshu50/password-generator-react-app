// eslint-disable-next-line react/prop-types
const Button = ({ onClick, text, customClass }) => {
  return (
    <button className={customClass} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;