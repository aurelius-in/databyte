/* client/public/styles.css */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

header {
  background-color: #333;
  color: white;
  padding: 10px;
  text-align: center;
}

nav a {
  margin: 0 15px;
  color: white;
  text-decoration: none;
}

main {
  padding: 20px;
}

footer {
  background-color: #333;
  color: white;
  text-align: center;
  padding: 10px;
  position: fixed;
  width: 100%;
  bottom: 0;
}

.thumbs {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.thumb {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
}

.thumb img {
  max-width: 100%;
  height: auto;
  display: block;
}

.thumb p {
  margin-top: 10px;
  font-size: 14px;
  color: #555;
}
