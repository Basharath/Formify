function Footer() {
  return (
    <footer className="px-10 py-4 bg-gray-700 flex flex-col items-center text-white text-lg">
      <div>This project is made as a part of</div>
      <div>
        <a
          href="https://planetscale.com/"
          target="_blank"
          rel="noreferrer"
          className="text-blue-400 hover:text-purple-300"
        >
          PlanetScale
        </a>{' '}
        &amp;{' '}
        <a
          href="https://hashnode.com/"
          target="_blank"
          rel="noreferrer"
          className="text-blue-400 hover:text-purple-300"
        >
          HashNode
        </a>{' '}
        Hackathon
      </div>
    </footer>
  );
}

export default Footer;