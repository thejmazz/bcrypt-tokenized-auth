# tokenized auth + bcrypt

This repo is an example of how to use tokenized authentication with
NodeJS(Express) and MongoDB. Passwords are protected with bcrypt. With regards
to choosing bcrypt over pbkdf2, see these links:

This
[comment](http://security.stackexchange.com/questions/4781/do-any-security-experts-recommend-bcrypt-for-password-storage#comment26855_6415)
:
```
TL;DR: bcrypt is better than PBKDF2 because PBKDF2 can be better accelerated
with GPUs. As such, PBKDF2 is easier to brute force offline with consumer
hardware
```

This [comment](http://stackoverflow.com/a/1561245/1409233): 
```
So, my recommendation of bcrypt stems from the assumptions 1) that a Blowfish
has had a similar level of scrutiny as the SHA-2 family of hash functions, and
2) that cryptanalytic methods for ciphers are better developed than those for
hash functions.
```

Some other stackoverflow questions:
* [Storing passwords with nodejs and mongodb](http://stackoverflow.com/questions/6951563/storing-passwords-with-node-js-and-mongodb)
* [nodejs password hashing bcrypt alternative using crypto](http://stackoverflow.com/a/22820185/1409233)
* [Password Encryption: PBKDF2 (using sha512 x 1000) vs Bcrypt](http://stackoverflow.com/a/5531194/1409233)

Further Wikipedia reading:
* [bcrypt](http://en.wikipedia.org/wiki/Bcrypt)
* [key derivation function](http://en.wikipedia.org/wiki/Key_derivation_function)
* [salt](http://en.wikipedia.org/wiki/Salt_(cryptography))

Some articles and tutorials I used:
* [Token-Based Authentication With AngularJS & NodeJS](http://code.tutsplus.com/tutorials/token-based-authentication-with-angularjs-nodejs--cms-22543)
* [How To Safely Store A Password](http://codahale.com/how-to-safely-store-a-password/)
* [Password Authentication with Mongoose (Part 1): bcrypt](http://devsmash.com/blog/password-authentication-with-mongoose-and-bcrypt)

What we will NOT be using: [crypto.pbkdf2(password, salt, iterations, keylen[, digest], callback)](https://nodejs.org/api/crypto.html#crypto_crypto_pbkdf2_password_salt_iterations_keylen_digest_callback)

What we WILL be using:
The NodeJS bcrypy module: [node.bcrypt.js](https://github.com/ncb000gt/node.bcrypt.js/)
