import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { query as q } from "faunadb";
import { fauna } from "@/services/fauna";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "read:user",
        },
      },
    }),
  ],
  callbacks: {
    async session({ session }: any) {
      try {

        const userActiveSubscription = await fauna.query<string>((
          q.Get(
            q.Intersection([
              q.Match(
                q.Index("subscription_by_user_ref"),
                q.Select(
                  "ref",
                  q.Get(
                    q.Match(
                      q.Index("user_by_email"),
                      q.Casefold(session.user.email)
                    )
                  )
                )
              ),
              q.Match(
                q.Index("subscription_by_status"),
                q.Casefold("active")
              )
            ])
          )
        )).catch(err => console.log('errinho fela da mae => ' + err))
        
        return {
          ...session,
          activeSubscription: userActiveSubscription
        };
      } catch (err) {
        return {
          ...session,
          activeSubscription: 'failed'
        }
      }
    },
    async signIn(user: any) {
      const { email } = user.user;

      try {
        await fauna.query(
          q.If(
            q.Not(
              q.Exists(
                q.Match(
                  q.Index("user_by_email"), 
                  q.Casefold(email)
                )
              )
            ),
            q.Create(
              q.Collection("users")
              , { data: { email } }
            ),
            q.Get(
              q.Match(
                q.Index("user_by_email"), 
                q.Casefold(email)
              )
            )
          )
        );

        return true;
      } catch (err) {
        return false;
      }
    },
  },
};
export default NextAuth(authOptions);
