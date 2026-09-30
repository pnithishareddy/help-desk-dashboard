import { useState } from "react";

function Settings({ onBack }) {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [whatsappNotifications, setWhatsappNotifications] = useState(false);
  const [ticketUpdates, setTicketUpdates] = useState(true);
  const [newTicketAlerts, setNewTicketAlerts] = useState(true);
  const [soundNotifications, setSoundNotifications] = useState(false);
  const [appearance, setAppearance] = useState("Light");
  const [twoFactor, setTwoFactor] = useState(false);

  return (
    <div className="settings-page">

      <div className="page-header">

        <div>

          <button
            className="back-link"
            onClick={onBack}
          >
            ← Back to Dashboard
          </button>

          <h1>
            Settings
          </h1>

          <p>
            Manage your notification and appearance preferences.
          </p>

        </div>

      </div>


      <div className="settings-container">

        {/* NOTIFICATIONS */}

        <div className="settings-card">

          <div className="settings-card-header">

            <div className="settings-icon">
              🔔
            </div>

            <div>
              <h2>
                Notifications
              </h2>

              <p>
                Choose how you want to receive notifications.
              </p>
            </div>

          </div>


          <div className="settings-option">

            <div>
              <strong>
                Email Notifications
              </strong>

              <p>
                Receive support ticket notifications through email.
              </p>
            </div>

            <label className="switch">

              <input
                type="checkbox"
                checked={emailNotifications}
                onChange={(e) =>
                  setEmailNotifications(e.target.checked)
                }
              />

              <span className="slider"></span>

            </label>

          </div>


          <div className="settings-option">

            <div>
              <strong>
                WhatsApp Notifications
              </strong>

              <p>
                Receive important ticket updates through WhatsApp.
              </p>
            </div>

            <label className="switch">

              <input
                type="checkbox"
                checked={whatsappNotifications}
                onChange={(e) =>
                  setWhatsappNotifications(e.target.checked)
                }
              />

              <span className="slider"></span>

            </label>

          </div>


          <div className="settings-option">

            <div>
              <strong>
                Ticket Updates
              </strong>

              <p>
                Get notified when a ticket is updated.
              </p>
            </div>

            <label className="switch">

              <input
                type="checkbox"
                checked={ticketUpdates}
                onChange={(e) =>
                  setTicketUpdates(e.target.checked)
                }
              />

              <span className="slider"></span>

            </label>

          </div>


          <div className="settings-option">

            <div>
              <strong>
                New Ticket Alerts
              </strong>

              <p>
                Receive notifications when a new ticket is created.
              </p>
            </div>

            <label className="switch">

              <input
                type="checkbox"
                checked={newTicketAlerts}
                onChange={(e) =>
                  setNewTicketAlerts(e.target.checked)
                }
              />

              <span className="slider"></span>

            </label>

          </div>


          <div className="settings-option">

            <div>
              <strong>
                Sound Notifications
              </strong>

              <p>
                Play a sound when a new notification arrives.
              </p>
            </div>

            <label className="switch">

              <input
                type="checkbox"
                checked={soundNotifications}
                onChange={(e) =>
                  setSoundNotifications(e.target.checked)
                }
              />

              <span className="slider"></span>

            </label>

          </div>

        </div>


        {/* APPEARANCE */}

        <div className="settings-card">

          <div className="settings-card-header">

            <div className="settings-icon">
              🎨
            </div>

            <div>

              <h2>
                Appearance
              </h2>

              <p>
                Customize how the dashboard looks.
              </p>

            </div>

          </div>


          <div className="appearance-section">

            <label>

              <span>
                Theme
              </span>

              <select
                value={appearance}
                onChange={(e) =>
                  setAppearance(e.target.value)
                }
              >

                <option value="Light">
                  Light
                </option>

                <option value="Dark">
                  Dark
                </option>

                <option value="System">
                  System Default
                </option>

              </select>

            </label>

          </div>

        </div>


        {/* PRIVACY AND SECURITY */}

        <div className="settings-card">

          <div className="settings-card-header">

            <div className="settings-icon">
              🔐
            </div>

            <div>

              <h2>
                Privacy & Security
              </h2>

              <p>
                Manage your account security preferences.
              </p>

            </div>

          </div>


          <div className="security-option">

            <div>

              <strong>
                Password
              </strong>

              <p>
                Change your account password.
              </p>

            </div>

            <button className="secondary-button">
              Change Password
            </button>

          </div>


          <div className="security-option">

            <div>

              <strong>
                Two-Factor Authentication
              </strong>

              <p>
                Add an extra layer of security to your account.
              </p>

            </div>

            <label className="switch">

              <input
                type="checkbox"
                checked={twoFactor}
                onChange={(e) =>
                  setTwoFactor(e.target.checked)
                }
              />

              <span className="slider"></span>

            </label>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Settings;