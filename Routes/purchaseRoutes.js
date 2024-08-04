const router = require('express').Router();
const Purchase = require("../Models/Purchase");
const User = require('../Models/Registration');
const cart = require('../Models/Cart')
router.post('/addpurchase', (req, res) => {
    const { Products, UserId, Amount, PaymentUTR, PaymentProof, isApproved } = req.body;
    const purchase = new Purchase({ Products, UserId, Amount, PaymentUTR, PaymentProof, isApproved });
    
    purchase.save()
        .then(result => {
            cart.findOne({userId:req.params.userid})
            .then(()=>{res.send("Purchase Successful")})
            .catch(err=>console.log("Error At Cart"))
        })
        .catch(err => {
            console.log(err)
            res.status(400).json("Purchase failed: " + err.message)
        });
});

router.get("/getpurchasedata", (req, res) => {
    Purchase.find()
        .then(data => res.send(data))
        .catch(err => res.status(404).send(err));
});

router.get('/approvepurchase/:userid', (req, res) => {
    Purchase.findOne({ UserId: req.params.userid })
        .then(purchase => {
            if (!purchase) {
                return res.status(404).send("Purchase not found");
            }

            User.findById(req.params.userid)
                .then(user => {
                    if (!user) {
                        return res.status(404).send("User not found");
                    }

                    user.Products = user.Products.concat(purchase.Products);

                    user.save()
                        .then(() => {
                            purchase.deleteOne()
                                .then(() => res.send("Purchase approved and Products added to user"))
                                .catch(err => res.status(500).send("Error deleting purchase: " + err.message));
                        })
                        .catch(err => res.status(500).send("Error saving user: " + err.message));
                })
                .catch(err => res.status(500).send("Error finding user: " + err.message));
        })
        .catch(err => res.status(500).send("Error finding purchase: " + err.message));
});

// Send order confirmation email
router.post('/sendOrderConfirmation', async (req, res) => {
    const { userId, products, amount, paymentUTR } = req.body;

    try {
        const user = await User.findById(userId);
        const mailOptions = {
            from: 'your-email@example.com',
            to: user.email,
            subject: 'Order Confirmation',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
                    <h1 style="color: #4CAF50; text-align: center;">Order Confirmation</h1>
                    <p>Dear ${user.name},</p>
                    <p>Thank you for your purchase! Here are your order details:</p>
                    <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                        <thead>
                            <tr>
                                <th style="border: 1px solid #dddddd; padding: 8px; background-color: #f2f2f2;">Product ID</th>
                                <th style="border: 1px solid #dddddd; padding: 8px; background-color: #f2f2f2;">Amount</th>
                                <th style="border: 1px solid #dddddd; padding: 8px; background-color: #f2f2f2;">Payment UTR</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${products.map(product => `
                                <tr>
                                    <td style="border: 1px solid #dddddd; padding: 8px; text-align: center;">${product}</td>
                                    <td style="border: 1px solid #dddddd; padding: 8px; text-align: center;">${amount}</td>
                                    <td style="border: 1px solid #dddddd; padding: 8px; text-align: center;">${paymentUTR}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                    <p style="margin-top: 20px;">If you have any questions, please contact our support team.</p>
                    <p>Best regards,</p>
                    <p><strong>Your Company Name</strong></p>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        res.status(200).send('Order confirmation email sent successfully.');
    } catch (error) {
        res.status(500).send('Error sending order confirmation email: ' + error.message);
    }
});

router.post('/sendApprovalEmail', async (req, res) => {
    const { userId } = req.body;

    try {
        const user = await User.findById(userId);
        const purchase = await Purchase.findOne({ userId });

        const mailOptions = {
            from: 'your-email@example.com',
            to: user.email,
            subject: 'Purchase Approved',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
                    <h1 style="color: #4CAF50; text-align: center;">Purchase Approved</h1>
                    <p>Dear ${user.name},</p>
                    <p>Your purchase has been successfully approved. Here are the details:</p>
                    <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                        <thead>
                            <tr>
                                <th style="border: 1px solid #dddddd; padding: 8px; background-color: #f2f2f2;">Product ID</th>
                                <th style="border: 1px solid #dddddd; padding: 8px; background-color: #f2f2f2;">Amount</th>
                                <th style="border: 1px solid #dddddd; padding: 8px; background-color: #f2f2f2;">Payment UTR</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${purchase.Products.map(product => `
                                <tr>
                                    <td style="border: 1px solid #dddddd; padding: 8px; text-align: center;">${product}</td>
                                    <td style="border: 1px solid #dddddd; padding: 8px; text-align: center;">${purchase.Amount}</td>
                                    <td style="border: 1px solid #dddddd; padding: 8px; text-align: center;">${purchase.PaymentUTR}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                    <p style="margin-top: 20px;">Thank you for shopping with us.</p>
                    <p>Best regards,</p>
                    <p><strong>Your Company Name</strong></p>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        res.status(200).send('Approval email sent successfully.');
    } catch (error) {
        res.status(500).send('Error sending approval email: ' + error.message);
    }
});

module.exports = router;
