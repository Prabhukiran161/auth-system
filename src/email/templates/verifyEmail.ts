export const verifyEmailTemplate = (verifyUrl: string): string => {
  return `
    <div style="font-family:sans-serif">
      <h2>Verify your email</h2>
      <p>Click the button below to verify your email.</p>

      <a href="${verifyUrl}" 
         style="
           padding:10px 20px;
           background:#4CAF50;
           color:white;
           text-decoration:none;
           border-radius:5px;
         ">
        Verify Email
      </a>

      <p>If you didn't create this account, ignore this email.</p>
    </div>
    `;
};
