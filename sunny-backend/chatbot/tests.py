from django.test import TestCase


class SunnyChatCorsTests(TestCase):
    def test_spagtech_vercel_origin_can_send_chat_preflight(self):
        origin = "https://spagtech-solar-solutions.vercel.app"

        response = self.client.options(
            "/api/chat/",
            HTTP_ORIGIN=origin,
            HTTP_ACCESS_CONTROL_REQUEST_METHOD="POST",
            HTTP_ACCESS_CONTROL_REQUEST_HEADERS="content-type",
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.headers["Access-Control-Allow-Origin"],
            origin,
        )
        self.assertIn("POST", response.headers["Access-Control-Allow-Methods"])
        self.assertIn("content-type", response.headers["Access-Control-Allow-Headers"])

    def test_unrelated_vercel_origin_is_not_allowed(self):
        response = self.client.options(
            "/api/chat/",
            HTTP_ORIGIN="https://unrelated-project.vercel.app",
            HTTP_ACCESS_CONTROL_REQUEST_METHOD="POST",
        )

        self.assertNotIn("Access-Control-Allow-Origin", response.headers)
