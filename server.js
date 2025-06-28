const express = require('express');
const path = require('path');

const app = express();
const distPath = path.join(__dirname,'dist');

app.use(express.static(distPath));

//Handle client-side routes with React Router
app.get('*',(req,res) => {
	res.sendFile(path.join(distPath, "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server is running on port $(PORT)`);
});
