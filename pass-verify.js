const bcrypt = require('bcrypt');

async function hashPassword(){
  const myPassword = 'admin 123 .202';
  const hash = '$2b$10$PC.siAEgzQM5c1L74DOfqeuG9puf75l.FEd6lWggMdhR7oYjarrMG';
  const isMatch = await bcrypt.compare(myPassword, hash);
  console.log(isMatch);
}

hashPassword();
