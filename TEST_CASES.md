## 1. Login Test Cases

| TC    | Description                            | Steps                                                                                           | Expected Result                            |
| ----- | -------------------------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------ |
| TC-01 | Login with valid credentials           | 1. Open Sauce Demo<br>2. Enter valid username<br>3. Enter valid password<br>4. Click Login      | User is redirected to Products page        |
| TC-02 | Login with invalid username            | 1. Open Sauce Demo<br>2. Enter invalid username<br>3. Enter valid password<br>4. Click Login    | Error message is displayed                 |
| TC-03 | Login with invalid password            | 1. Open Sauce Demo<br>2. Enter valid username<br>3. Enter invalid password<br>4. Click Login    | Error message is displayed                 |
| TC-04 | Login with empty username and password | 1. Open Sauce Demo<br>2. Leave username and password empty<br>3. Click Login                    | Error message: username required           |
| TC-05 | Login with locked-out user             | 1. Open Sauce Demo<br>2. Enter locked-out username<br>3. Enter valid password<br>4. Click Login | User is blocked with correct error message |

Note: Includes negative testing and business rules validation

---

## 2. Product Page Test Cases

| TC    | Description                                   | Expected Result                                     |
| ----- | --------------------------------------------- | --------------------------------------------------- |
| TC-06 | Verify product list is displayed              | All products load correctly with name, price, image |
| TC-07 | Add single product to cart                    | Cart icon updates with item count                   |
| TC-08 | Remove product from cart                      | Item is removed and cart count updates              |
| TC-09 | Add multiple products to cart                 | Correct item count shown in cart                    |
| TC-10 | Verify product sorting by price (low to high) | Products are sorted correctly                       |

Note: Includes sorting and filtering functionality

---

## 3. Cart Test Cases

| TC    | Description                          | Expected Result                       |
| ----- | ------------------------------------ | ------------------------------------- |
| TC-11 | Navigate to cart page                | Cart page loads successfully          |
| TC-12 | Verify selected items appear in cart | Correct products and prices displayed |
| TC-13 | Remove item from cart page           | Item is removed successfully          |
| TC-14 | Continue shopping from cart          | User returns to products page         |

---

## 4. Checkout Test Cases

| TC    | Description                          | Expected Result                   |
| ----- | ------------------------------------ | --------------------------------- |
| TC-15 | Proceed to checkout                  | Checkout page opens               |
| TC-16 | Checkout with valid user information | User proceeds to overview page    |
| TC-17 | Checkout with missing first name     | Validation error displayed        |
| TC-18 | Verify total price calculation       | Total = item price + tax          |
| TC-19 | Complete checkout process            | Order confirmation page displayed |

Note: Includes total price calculation and tax validation

---

## 5. Logout Test Cases

| TC    | Description                      | Expected Result                               |
| ----- | -------------------------------- | --------------------------------------------- |
| TC-20 | Logout from application          | User is redirected to login page              |
| TC-21 | Verify session ends after logout | User cannot access product page without login |

Note: Includes session validation

---

## 6. Security & Session Tests

| TC    | Description                       | Expected Result          |
| ----- | --------------------------------- | ------------------------ |
| TC-22 | Access product page without login | Redirected to login page |
| TC-23 | Refresh page after logout         | User remains logged out  |

---

## 7. UI & Usability Tests

| TC    | Description                                 | Expected Result                 |
| ----- | ------------------------------------------- | ------------------------------- |
| TC-24 | Verify error messages are readable          | Error text is clear and visible |
| TC-25 | Verify buttons are clickable and responsive | No UI issues                    |
