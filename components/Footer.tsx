function Footer() {
  return (
    <footer className="px-10 py-4 bg-gray-700 flex flex-col items-center text-gray-50 text-base">
      <div>
        <a
          href="https://devapt.com/"
          target="_blank"
          rel="noreferrer"
          className="text-blue-400 hover:text-purple-300"
        >
          DevApt
        </a>{' '}
        &copy; {new Date().getFullYear()}
      </div>
    </footer>
  );
}

export default Footer;
