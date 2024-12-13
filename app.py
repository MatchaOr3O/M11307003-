from flask import Flask, render_template, request, redirect, url_for, session

app = Flask(__name__)
app.secret_key = 'secret123'  # 用於保護 session 資料

phonebook = []

@app.route('/')
def index():
    """顯示主頁面，將 phonebook 資料傳遞到前端"""
    return render_template('index.html', phonebook=phonebook)

@app.route('/add', methods=['POST'])
def add_contact():
    """新增聯絡人（名字和電話）"""
    name = request.form['name']
    phone = request.form['phone']
    if name and phone:
        phonebook.append({'name': name, 'phone': phone})
    return redirect(url_for('index'))

@app.route('/delete/<int:index>', methods=['POST'])
def delete_contact(index):
    """刪除指定索引的聯絡人"""
    if 0 <= index < len(phonebook):
        del phonebook[index]
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)


# 模擬便當資料 (通常會來自資料庫)
menu = [
    {'id': 1, 'name': '炸雞便當', 'price': 100},
    {'id': 2, 'name': '咖哩豬排便當', 'price': 120},
    {'id': 3, 'name': '滷肉飯便當', 'price': 80},
    {'id': 4, 'name': '魚排便當', 'price': 110},
]

# 頁面1：首頁，顯示便當選單
@app.route('/')
def index():
    return render_template('index.html', menu=menu)

# 頁面2：將便當加入購物車
@app.route('/add_to_cart', methods=['POST'])
def add_to_cart():
    item_id = int(request.form['item_id'])
    quantity = int(request.form['quantity'])

    # 從 session 中讀取現有的購物車，沒有則建立空的購物車
    cart = session.get('cart', [])

    # 檢查便當是否已經在購物車中，如果已經存在，則更新數量
    item_exists = False
    for item in cart:
        if item['id'] == item_id:
            item['quantity'] += quantity
            item_exists = True
            break

    # 如果購物車中沒有該商品，則新增該商品
    if not item_exists:
        cart.append({'id': item_id, 'name': next(i['name'] for i in menu if i['id'] == item_id), 'price': next(i['price'] for i in menu if i['id'] == item_id), 'quantity': quantity})

    session['cart'] = cart  # 儲存購物車於 session 中
    return redirect(url_for('view_cart'))

# 頁面3：顯示購物車
@app.route('/cart')
def view_cart():
    cart = session.get('cart', [])
    total_price = sum(item['price'] * item['quantity'] for item in cart)
    return render_template('cart.html', cart=cart, total_price=total_price)

# 頁面4：刪除購物車中的便當
@app.route('/delete_from_cart/<int:item_id>')
def delete_from_cart(item_id):
    cart = session.get('cart', [])
    cart = [item for item in cart if item['id'] != item_id]  # 刪除選中的便當
    session['cart'] = cart
    return redirect(url_for('view_cart'))

# 頁面5：確認訂單
@app.route('/confirm_order', methods=['POST'])
def confirm_order():
    session.pop('cart', None)  # 清空購物車
    return render_template('order_confirm.html')

if __name__ == '__main__':
    app.run(debug=True)
