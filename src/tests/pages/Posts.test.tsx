import Posts, { getStaticProps } from "../../pages/posts";
import { render, screen } from "@testing-library/react";
import { stripe } from "../../services/stripe";
import { getPrismicClient } from "../../services/prismic";

jest.mock("../../services/prismic");

const postsArray = [
  {
    slug: "my-new-post",
    title: "My New Post",
    excerpt: "Post excerpt",
    updatedAt: "10 de Abril",
  },
];

describe("Posts page", () => {
  it("should renders correctly", () => {
    render(<Posts posts={postsArray} />);

    expect(screen.getByText("My New Post")).toBeInTheDocument();
  });

  it("loads initial data", async () => {
    const getPrismicClientMocked = jest.mocked(getPrismicClient);
    getPrismicClientMocked.mockReturnValueOnce({
      query: jest.fn().mockResolvedValueOnce({
        results: [
          {
            uid: "my-new-post",
            data: {
              title: [{ type: "heading", text: "My New Post" }],
              content: [{ type: "paragraph", text: "Post excerpt" }],
            },
            last_publication_date: "04-01-2021",
          },
        ],
      }),
    } as any);

    const response = await getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [
            {
              slug: "my-new-post",
              title: "My New Post",
              excerpt: "Post excerpt",
              updatedAt: '01 de abril de 2021',
            },
          ],
        },
      })
    );
  });
});
