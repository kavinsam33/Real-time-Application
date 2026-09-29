import javax.swing.*;
import java.awt.*;
import java.text.SimpleDateFormat;
import java.util.Date;

public class PizzaDeliveryGUI extends JFrame {

    JTextField orderIdField;
    JTextField customerIdField;
    JTextField customerNameField;
    JTextField phoneField;
    JTextField addressField;
    JTextField quantityField;

    JComboBox<String> pizzaBox;
    JComboBox<String> agentBox;
    JComboBox<String> statusBox;

    JLabel totalLabel;
    JLabel orderTimeLabel;
    JLabel updateTimeLabel;

    public PizzaDeliveryGUI() {

        setTitle("Pizza Delivery System");
        setSize(600, 700);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null);

        JPanel panel = new JPanel();
        panel.setLayout(new GridLayout(0, 2, 10, 10));
        panel.setBorder(BorderFactory.createEmptyBorder(20, 20, 20, 20));

        // Title
        JLabel title = new JLabel("PIZZA DELIVERY SYSTEM");
        title.setFont(new Font("Arial", Font.BOLD, 24));
        title.setHorizontalAlignment(SwingConstants.CENTER);

        add(title, BorderLayout.NORTH);

        // Order ID
        panel.add(new JLabel("Order ID:"));
        orderIdField = new JTextField();
        panel.add(orderIdField);

        // Customer ID
        panel.add(new JLabel("Customer ID:"));
        customerIdField = new JTextField();
        panel.add(customerIdField);

        // Customer Name
        panel.add(new JLabel("Customer Name:"));
        customerNameField = new JTextField();
        panel.add(customerNameField);

        // Phone
        panel.add(new JLabel("Phone:"));
        phoneField = new JTextField();
        panel.add(phoneField);

        // Address
        panel.add(new JLabel("Address:"));
        addressField = new JTextField();
        panel.add(addressField);

        // Pizza
        panel.add(new JLabel("Pizza:"));

        String[] pizzas = {
            "Margherita - 199",
            "Farmhouse - 299",
            "Pepper BBQ - 399",
            "Cheese Burst - 349"
        };

        pizzaBox = new JComboBox<>(pizzas);
        panel.add(pizzaBox);

        // Quantity
        panel.add(new JLabel("Quantity:"));
        quantityField = new JTextField("1");
        panel.add(quantityField);

        // Delivery Agent
        panel.add(new JLabel("Delivery Agent:"));

        String[] agents = {
            "Karthik",
            "Vijay",
            "Sanjay"
        };

        agentBox = new JComboBox<>(agents);
        panel.add(agentBox);

        // Status
        panel.add(new JLabel("Order Status:"));

        String[] statuses = {
            "Placed",
            "Confirmed",
            "Preparing",
            "Out for Delivery",
            "Delivered",
            "Cancelled"
        };

        statusBox = new JComboBox<>(statuses);
        panel.add(statusBox);

        // Order Time
        panel.add(new JLabel("Order Time:"));
        orderTimeLabel = new JLabel("-");
        panel.add(orderTimeLabel);

        // Update Time
        panel.add(new JLabel("Status Update Time:"));
        updateTimeLabel = new JLabel("-");
        panel.add(updateTimeLabel);

        // Total
        panel.add(new JLabel("Total Amount:"));
        totalLabel = new JLabel("₹0");
        panel.add(totalLabel);

        // Place Order Button
        JButton placeButton = new JButton("PLACE ORDER");
        panel.add(placeButton);

        // Update Status Button
        JButton updateButton = new JButton("UPDATE STATUS");
        panel.add(updateButton);

        add(panel, BorderLayout.CENTER);

        // Place Order Action
        placeButton.addActionListener(e -> placeOrder());

        // Update Status Action
        updateButton.addActionListener(e -> updateStatus());

        setVisible(true);
    }

    private void placeOrder() {

        if (orderIdField.getText().isEmpty() ||
            customerIdField.getText().isEmpty() ||
            customerNameField.getText().isEmpty()) {

            JOptionPane.showMessageDialog(
                this,
                "Please enter Order ID, Customer ID and Customer Name."
            );

            return;
        }

        try {

            int quantity =
                Integer.parseInt(quantityField.getText());

            String pizza =
                (String) pizzaBox.getSelectedItem();

            int price = 0;

            if (pizza.contains("199")) {
                price = 199;
            } else if (pizza.contains("299")) {
                price = 299;
            } else if (pizza.contains("399")) {
                price = 399;
            } else if (pizza.contains("349")) {
                price = 349;
            }

            int total = price * quantity;

            String currentTime =
                new SimpleDateFormat(
                    "yyyy-MM-dd HH:mm:ss"
                ).format(new Date());

            totalLabel.setText("₹" + total);
            orderTimeLabel.setText(currentTime);
            updateTimeLabel.setText(currentTime);

            statusBox.setSelectedItem("Placed");

            JOptionPane.showMessageDialog(
                this,
                "Pizza Order Placed Successfully!"
            );

        } catch (NumberFormatException ex) {

            JOptionPane.showMessageDialog(
                this,
                "Please enter a valid quantity."
            );
        }
    }

    private void updateStatus() {

        String currentTime =
            new SimpleDateFormat(
                "yyyy-MM-dd HH:mm:ss"
            ).format(new Date());

        updateTimeLabel.setText(currentTime);

        JOptionPane.showMessageDialog(
            this,
            "Order status updated successfully!"
        );
    }

    public static void main(String[] args) {

        SwingUtilities.invokeLater(() -> {
            new PizzaDeliveryGUI();
        });
    }
}
