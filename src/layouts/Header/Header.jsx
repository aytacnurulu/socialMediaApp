import { FaEnvelope, FaBell } from "react-icons/fa";

function Header() {
  return (
    <div
      className="navbar navbar-expand-lg px-4 py-3 shadow-sm h-100"
      style={{ backgroundColor: "#0f1b2d" }}
    >
      <div className="container-fluid d-flex justify-content-between align-items-center h-100">
        <a className="navbar-brand fw-bold fs-3 text-info" href="#">
          sarkhanrahimlidev
        </a>

        <form className="d-none d-md-block w-50">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Search by name..."
          />
        </form>

        <div className="d-flex align-items-center gap-4">
          <div className="position-relative">
            <FaEnvelope className="text-white fs-3" />
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              1
            </span>
          </div>

          <div className="position-relative">
            <FaBell className="text-white fs-3" />
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              7
            </span>
          </div>

          <img
            src="https://i.pravatar.cc/100"
            alt="profile"
            className="rounded-circle"
            width="54"
            height="54"
          />
        </div>
      </div>
    </div>
  );
}

export default Header;