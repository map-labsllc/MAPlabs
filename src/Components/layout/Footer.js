import React from 'react'

const Footer = () => (
  <footer className="footer">
    <div className="container-fluid">
      <nav>
        {/* <ul className="footer-menu">
          <li>
            <a href="/">
              Home
            </a>
          </li>
        </ul> */}
        <a href="https://www.map-labs.com/map-maker-core-meaning-and-purpose-program.html">
          <p className="copyright text-center">
            ©
            <script>
            document.write(new Date().getFullYear())
            </script>

          MAPlabs
          </p>
        </a>
      </nav>
    </div>
  </footer>
)

export default Footer
