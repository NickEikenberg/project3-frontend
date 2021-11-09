const Header = () => {
  return (
    <header className="w-full flex justify-between items-center bg-white py-4 px-4 shadow-sm">
      <h1 className="text-3xl text-center">Tinier Bananas</h1>
      <img
        className="justify-self-end flex justify-end h-14 border border-black border-opacity-75 rounded-lg"
        src="../tiny-bananas.jpeg"
        alt="tiny bananas"
      />
    </header>
  );
};

export default Header;
