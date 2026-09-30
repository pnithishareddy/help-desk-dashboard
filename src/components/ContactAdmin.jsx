function ContactAdmin({ onBack }) {
  return (
    <div className="contact-page">

      <div className="page-header">

        <div>

          <button
            className="back-link"
            onClick={onBack}
          >
            ← Back to Dashboard
          </button>

          <h1>
            Contact Admin
          </h1>

          <p>
            Contact the administrator for help and support.
          </p>

        </div>

      </div>


      <div className="contact-card">

        <div className="contact-header">

          <div className="contact-main-icon">
            📞
          </div>

          <div>

            <h2>
              Need Assistance?
            </h2>

            <p>
              Our administrator is available to help with your support needs.
            </p>

          </div>

        </div>


        <div className="contact-item">

          <div className="contact-item-left">

            <span className="contact-item-icon">
              👤
            </span>

            <strong>
              Administrator
            </strong>

          </div>

          <span>
            Admin User
          </span>

        </div>


        <div className="contact-item">

          <div className="contact-item-left">

            <span className="contact-item-icon">
              ✉️
            </span>

            <strong>
              Email
            </strong>

          </div>

          <span>
            admin@supportdesk.com
          </span>

        </div>


        <div className="contact-item">

          <div className="contact-item-left">

            <span className="contact-item-icon">
              📱
            </span>

            <strong>
              Phone
            </strong>

          </div>

          <span>
            +91 98765 43210
          </span>

        </div>


        <div className="contact-item">

          <div className="contact-item-left">

            <span className="contact-item-icon">
              🕐
            </span>

            <strong>
              Support Hours
            </strong>

          </div>

          <span>
            Monday - Friday, 9:00 AM - 6:00 PM
          </span>

        </div>


        <button
          className="primary-button contact-button"
          onClick={() =>
            window.location.href =
              "mailto:admin@supportdesk.com"
          }
        >
          ✉️ Send Email
        </button>

      </div>

    </div>
  );
}

export default ContactAdmin;