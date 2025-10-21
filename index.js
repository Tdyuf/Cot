const express = require('express');
const app = express();
const PORT = process.env.PORT; // مهم جدًا

app.get('/', (req, res) => {
  res.send('Server is running ✅');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
