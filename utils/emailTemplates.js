// utils/emailTemplates.js

function activationTemplate({ name, activationUrl, type = "user" }) {
  const brand = type === "shop" ? "MV Shop Seller" : "MV Shop";
  return `
  <div style="font-family: 'Segoe UI', Tahoma, sans-serif; background: #f4f6f9; padding: 30px; text-align: center;">
    <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
      
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #f05518, #5a3eff); padding: 30px;">
        <h1 style="color: #fff; margin: 0; font-size: 26px;">Welcome to ${brand} 🎉</h1>
      </div>

      <!-- Body -->
      <div style="padding: 30px; text-align: left;">
        <h2 style="color: #222; font-size: 20px;">Hello ${name},</h2>
        <p style="color: #555; font-size: 15px; line-height: 1.6;">
          Thanks for signing up! Please confirm your email address by clicking the button below:
        </p>
        
        <div style="text-align: center; margin: 35px 0;">
          <a href="${activationUrl}" style="background: #f05518; color: #fff; padding: 14px 34px; border-radius: 6px; text-decoration: none; font-size: 16px; font-weight: 600; display: inline-block;">
            Activate My Account
          </a>
        </div>

        <p style="color: #888; font-size: 13px; text-align: center;">
          If you didn’t sign up for ${brand}, you can safely ignore this email.
        </p>
      </div>

      <!-- Footer -->
      <div style="background: #f9f9f9; padding: 15px; font-size: 12px; color: #999;">
        &copy; ${new Date().getFullYear()} ${brand}. All rights reserved.
      </div>
    </div>
  </div>`;
}

function congratulationsTemplate({ name, type = "user" }) {
  const brand = type === "shop" ? "MV Shop Seller" : "MV Shop";
  const accountType = type === "shop" ? "Shop" : "Account";

  return `
  <div style="font-family: 'Segoe UI', Tahoma, sans-serif; background: #f4f6f9; padding: 30px; text-align: center;">
    <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
      
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #14562f, #00c853); padding: 30px;">
        <h1 style="color: #fff; margin: 0; font-size: 26px;">🎊 Congratulations!</h1>
      </div>

      <!-- Body -->
      <div style="padding: 30px; text-align: left;">
        <h2 style="color: #222; font-size: 20px;">Hi ${name},</h2>
        <p style="color: #555; font-size: 15px; line-height: 1.6;">
          Your <strong>${accountType}</strong> has been successfully activated. Welcome aboard at <strong>${brand}</strong>!
        </p>
        
        <div style="text-align: center; margin: 35px 0;">
          <span style="display: inline-block; background: #f05518; color: #fff; padding: 14px 30px; border-radius: 6px; font-size: 16px; font-weight: 600;">
            Start Exploring 🚀
          </span>
        </div>

        <p style="color: #888; font-size: 13px; text-align: center;">
          Need help? Our support team is just one click away.
        </p>
      </div>

      <!-- Footer -->
      <div style="background: #f9f9f9; padding: 15px; font-size: 12px; color: #999;">
        &copy; ${new Date().getFullYear()} ${brand}. All rights reserved.
      </div>
    </div>
  </div>`;
}

function orderConfirmationTemplate({ name, totalPrice }) {
  return `
  <div style="font-family: 'Segoe UI', Tahoma, sans-serif; background: #f4f6f9; padding: 30px; text-align: center;">
    <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
      
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #0061ff, #00b4d8); padding: 30px;">
        <h1 style="color: #fff; margin: 0; font-size: 26px;">🛒 Order Confirmed!</h1>
      </div>

      <!-- Body -->
      <div style="padding: 30px; text-align: left;">
        <h2 style="color: #222; font-size: 20px;">Hi ${name},</h2>
        <p style="color: #555; font-size: 15px; line-height: 1.6;">
          Thank you for shopping with <strong>MV Shop</strong>! Your order has been successfully placed and is being processed.
        </p>

        <div style="margin: 25px 0; text-align: center;">
          <div style="display: inline-block; background: #f4f6f9; padding: 20px; border-radius: 10px; border: 1px solid #eee;">
            <p style="margin: 0; font-size: 15px; color: #444;">Total Amount</p>
            <h2 style="margin: 8px 0 0; color: #0061ff; font-size: 22px;">$${totalPrice}</h2>
          </div>
        </div>

        <div style="text-align: center; margin: 35px 0;">
          <span style="display: inline-block; background: #f05518; color: #fff; padding: 14px 30px; border-radius: 6px; font-size: 16px; font-weight: 600;">
            View My Order 📦
          </span>
        </div>

        <p style="color: #888; font-size: 13px; text-align: center;">
          You’ll receive another email when your items are on the way.
        </p>
      </div>

      <!-- Footer -->
      <div style="background: #f9f9f9; padding: 15px; font-size: 12px; color: #999;">
        &copy; ${new Date().getFullYear()} MV Shop. All rights reserved.
      </div>
    </div>
  </div>`;
}

module.exports = {
  activationTemplate,
  congratulationsTemplate,
  orderConfirmationTemplate,
};
