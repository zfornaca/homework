import unittest
from app import app, User, Message

# TESTING CHANGES BASED ON LOGIN IMPLEMENTATION
#
# users_index()
# * presence of login/create acct text relative to login status
# * presence of known user's name in list
# register()
# * redirect to login page
# * new user added to db
# login()
# * redirect to index page
# * session['user_id'] exists


class MessagesTests(unittest.TestCase):
    def test_msgs_index(self):
        client = app.test_client()

        result = client.get('/users/1/msgs')
        self.assertIn(b'Aquinas', result.data)

        result = client.get('/users/1337/msgs')
        self.assertNotIn(b'Boba Fett', result.data)

    def test_msgs_new(self):
        client = app.test_client()

        result = client.get('/users/1/msgs/new')
        self.assertIn(b'So speaks', result.data)

        result = client.get('/users/1337/msgs')
        self.assertEqual(404, result.status_code)

    def test_msgs_create(self):
        client = app.test_client()
        result = client.post(
            '/users/1/msgs',
            data={
                'content': 'Hello this is a message from Mr. Aquinas',
                'user_id': 1,
                'tags': [1]
            },
            follow_redirects=True)

        self.assertIn(b'Hello this is a message', result.data)

    def test_msgs_show(self):
        client = app.test_client()
        result = client.get('/msgs/12')

        self.assertIn(b'scrappy duder', result.data)

    def test_msgs_destroy(self):
        client = app.test_client()
        result = client.delete("/msgs/13")

        self.assertNotIn(b'I live only to be deleted', result.data)

    def test_msgs_edit(self):
        client = app.test_client()
        result = client.get("/msgs/4/edit")
        self.assertIn(b'Beware of the person of one book', result.data)

    def test_msgs_update(self):
        client = app.test_client()
        msg = Message.query.get(3)
        result = client.patch(
            "/msgs/3",
            data={
                'content': 'The things that we wuv tell us who we are',
                'user_id': msg.user
            },
            follow_redirects=True)

        self.assertIn(b'wuv', result.data)
        self.assertNotIn(b'love', result.data)


class UsersTests(unittest.TestCase):
    def test_root(self):
        client = app.test_client()

        result = client.get('/')
        self.assertEqual(302, result.status_code)

    def test_users_index(self):
        client = app.test_client()

        result = client.get('/users')
        self.assertIn(b'Add a new philosopher', result.data)

    def test_users_create(self):
        client = app.test_client()
        result = client.post(
            '/users',
            data={
                'first_name': 'Sensational',
                'last_name': 'She-Hulk',
                'image_url': '#'
            },
            follow_redirects=True)

        self.assertIn(b'Sensational She-Hulk', result.data)

        result = client.post(
            '/users',
            data={
                'first_name': 'Johnny One Name',
                'last_name': '',
                'image_url': ''
            },
            follow_redirects=True)

        self.assertIn(b'Johnny One Name', result.data)

        result = client.post(
            '/users',
            data={
                'first_name': '',
                'last_name': 'Josie Last Only',
                'image_url': ''
            },
            follow_redirects=True)

        self.assertNotIn(b'Josie Last Only', result.data)

    def test_users_show(self):
        client = app.test_client()
        result = client.get("/users/1")
        self.assertIn(
            b'https://sadanduseless.b-cdn.net/wp-content/uploads/2016/05/cute-dogs7.jpg',
            result.data)

        result = client.get("/users/1337")
        self.assertEqual(404, result.status_code)

    def test_users_edit(self):
        client = app.test_client()
        result = client.get("/users/1/edit")
        self.assertIn(
            b'https://sadanduseless.b-cdn.net/wp-content/uploads/2016/05/cute-dogs7.jpg',
            result.data)

        result = client.get("/users/1337/edit")
        self.assertEqual(404, result.status_code)

    def test_users_update(self):
        client = app.test_client()
        user = User.query.get(1)
        result = client.patch(
            "/users/1",
            data={
                'first_name': 'Timmy',
                'last_name': user.last_name,
                'image_url': user.image_url
            },
            follow_redirects=True)

        self.assertIn(b'Timmy', result.data)
        self.assertIn(b'Aquinas', result.data)

    def test_users_destroy(self):
        client = app.test_client()
        result = client.delete("/users/49", follow_redirects=True)

        self.assertNotIn(b'Amora Brown', result.data)


if __name__ == '__main__':

    # If called like a script, run our tests
    unittest.main()