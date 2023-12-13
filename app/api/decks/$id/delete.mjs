// View documentation at: https://enhance.dev/docs/learn/starter-project/api
import { deleteDeck } from '../../../models/decks.mjs'


/**
 * @type {import('@enhance/types').EnhanceApiFn}
 */
export async function post (req) {
  const id = req.pathParameters?.id

  const session = req.session
  // eslint-disable-next-line no-unused-vars
  let { problems: removedProblems, deck: removed, ...newSession } = session
  try {
    let deck = await deleteDeck(id)
    return {
      session: newSession,
      json: { deck },
      location: '/decks'
    }
  }
  catch (err) {
    return {
      session: { ...newSession, error: err.message },
      json: { error: err.message },
      location: '/decks'
    }
  }
}
