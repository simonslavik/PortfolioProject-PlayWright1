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
| TC-10 | Verify product list is displayed              | All products load correctly with name, price, image |
| TC-11 | Add single product to cart                    | Cart icon updates with item count                   |
| TC-12 | Remove product from cart                      | Item is removed and cart count updates              |
| TC-13 | Add multiple products to cart                 | Correct item count shown in cart                    |
| TC-14 | Verify product sorting by price (low to high) | Products are sorted correctly                       |

Note: Includes sorting and filtering functionality

---

## 3. Cart Test Cases

| TC    | Description                          | Expected Result                       |
| ----- | ------------------------------------ | ------------------------------------- |
| TC-06 | Navigate to cart page                | Cart page loads successfully          |
| TC-07 | Verify selected items appear in cart | Correct products and prices displayed |
| TC-08 | Remove item from cart page           | Item is removed successfully          |
| TC-09 | Continue shopping from cart          | User returns to products page         |

---

## 4. Logout Test Cases

| TC    | Description                      | Expected Result                               |
| ----- | -------------------------------- | --------------------------------------------- |
| TC-15 | Logout from application          | User is redirected to login page              |
| TC-16 | Verify session ends after logout | User cannot access product page without login |

Note: Includes session validation

---

## 5. Security & Session Tests

| TC    | Description                       | Expected Result          |
| ----- | --------------------------------- | ------------------------ |
| TC-17 | Access product page without login | Redirected to login page |
| TC-18 | Refresh page after logout         | User remains logged out  |

---

## 6. UI & Usability Tests

| TC    | Description                                 | Expected Result                 |
| ----- | ------------------------------------------- | ------------------------------- |
| TC-19 | Verify error messages are readable          | Error text is clear and visible |
| TC-20 | Verify buttons are clickable and responsive | No UI issues                    |
