function Profile({ onBack }) {
  return (
    <div className="profile-page">

      <div className="page-header">
        <div>

          <button
            className="back-link"
            onClick={onBack}
          >
            ← Back to Dashboard
          </button>

          <h1>My Profile</h1>

          <p>
            View and manage your account information.
          </p>

        </div>
      </div>

      <div className="profile-card">

        <div className="profile-header">

          <div className="large-avatar">
            A
          </div>

          <div>
            <h2>Admin User</h2>

            <p>
              Administrator
            </p>
          </div>

        </div>

        <div className="profile-details">

          <div className="profile-detail">

            <span className="profile-detail-icon">
              👤
            </span>

            <div>
              <small>
                Full Name
              </small>

              <strong>
                P Nithisha
              </strong>
            </div>

          </div>


          <div className="profile-detail">

            <span className="profile-detail-icon">
              ✉️
            </span>

            <div>
              <small>
                Email Address
              </small>

              <strong>
                nithisha@supportdesk.com
              </strong>
            </div>

          </div>


          <div className="profile-detail">

            <span className="profile-detail-icon">
              📱
            </span>

            <div>
              <small>
                Phone Number
              </small>

              <strong>
                +91 98765 43210
              </strong>
            </div>

          </div>


          <div className="profile-detail">

            <span className="profile-detail-icon">
              🆔
            </span>

            <div>
              <small>
                User ID
              </small>

              <strong>
                nithishareddy
              </strong>
            </div>

          </div>


          <div className="profile-detail">

            <span className="profile-detail-icon">
              🛡️
            </span>

            <div>
              <small>
                Role
              </small>

              <strong>
                Administrator
              </strong>
            </div>

          </div>


          <div className="profile-detail">

            <span className="profile-detail-icon">
              📅
            </span>

            <div>
              <small>
                Account Created
              </small>

              <strong>
                September 29, 2026
              </strong>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;