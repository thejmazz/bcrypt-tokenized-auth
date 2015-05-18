# tokenized auth + bcrypt

This repo is an example of how to use [tokenized authentication](http://stackoverflow.com/questions/1592534/what-is-token-based-authentication) 
with
[NodeJS](https://nodejs.org/) ([Express](http://expressjs.com/) and [MongoDB](https://www.mongodb.org/). Passwords are protected with [bcrypt](http://en.wikipedia.org/wiki/Bcrypt). 

### Install
```
cd frontend, npm install (just for express and morgan), bower install
cd backend, npm install
```
The version of `ngStorage` used is a [forked copy](https://github.com/raynode/ngStorage) not in Bower.
It is useful because the author has included a very awesome `$localStorage.$save()` method. For now
the repo has been cloned into `frontend\app\lib`.

### Run
```
$ node fronted/client.js 
$ node backend/server.js
Visit localhost:3000
```
### bcrypt vs. pbkdf2

What we will NOT be using: [crypto.pbkdf2(...)](https://nodejs.org/api/crypto.html#crypto_crypto_pbkdf2_password_salt_iterations_keylen_digest_callback)

What we WILL be using: [node.bcrypt.js](https://github.com/ncb000gt/node.bcrypt.js/)

With regards to choosing `bcrypt` over `pbkdf2`, see these links:

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

### Related Articles and Tutorials
* [Token-Based Authentication With AngularJS & NodeJS](http://code.tutsplus.com/tutorials/token-based-authentication-with-angularjs-nodejs--cms-22543)
* [How To Safely Store A Password](http://codahale.com/how-to-safely-store-a-password/)
* [Password Authentication with Mongoose (Part 1): bcrypt](http://devsmash.com/blog/password-authentication-with-mongoose-and-bcrypt)

### Further Reading
* [key derivation function](http://en.wikipedia.org/wiki/Key_derivation_function)
* [salt](http://en.wikipedia.org/wiki/Salt_(cryptography))
* [hash function](http://en.wikipedia.org/wiki/Hash_function)
* [cryptographic hash function](http://en.wikipedia.org/wiki/Cryptographic_hash_function)
* [the original bcrpyt paper](https://www.usenix.org/legacy/events/usenix99/provos/provos.pdf)
