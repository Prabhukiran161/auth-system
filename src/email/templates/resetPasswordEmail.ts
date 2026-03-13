export const resetPasswordEmailTemplate = (resetUrl: string): string => {
  return `
    <div style="font-family:sans-serif">
      <h2>Reset your password</h2>

      <p>You requested to reset your password.</p>
      <p>Click the button below to set a new password.</p>

      <a href="${resetUrl}" 
         style="
           padding:10px 20px;
           background:#f44336;
           color:white;
           text-decoration:none;
           border-radius:5px;
           display:inline-block;
           margin-top:10px;
         ">
        Reset Password
      </a>

      <p style="margin-top:20px;">
        This link will expire soon for security reasons.
      </p>

      <p>
        If you didn’t request a password reset, you can safely ignore this email.
      </p>
    </div>
  `;
};
