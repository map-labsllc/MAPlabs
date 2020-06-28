import React from 'react'

const Footer = () => (
  <footer class="footer">
    <div class="container-fluid">
      <nav>
        <ul class="footer-menu">
          <li>
            <a href="/">
              Home
            </a>
          </li>
        </ul>
        <p class="copyright text-center">
            ©
          <script>
            document.write(new Date().getFullYear())
          </script>
          M.A.P. Labs
        </p>
      </nav>
    </div>
  </footer>
)

export default Footer