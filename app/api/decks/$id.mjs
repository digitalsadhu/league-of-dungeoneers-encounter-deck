// View documentation at: https://enhance.dev/docs/learn/starter-project/api
/**
  * @typedef {import('@enhance/types').EnhanceApiFn} EnhanceApiFn
  */
import { getDeck, upsertDeck, validate } from '../../models/decks.mjs'


/**
 * @type {EnhanceApiFn}
 */
export async function get (req) {
  if (req.session.problems) {
    let { problems, deck, ...session } = req.session
    return {
      session,
      json: { problems, deck }
    }
  }

  const id = req.pathParameters?.id
  const result = await getDeck(id)
  return {
    json: { deck: result }
  }
}

/**
 * @type {EnhanceApiFn}
 */
export async function post (req) {
  const id = req.pathParameters?.id

  const session = req.session
  // Validate
  let { problems, deck } = await validate.update(req)
  if (problems) {
    return {
      session: {...session, problems, deck },
      json: { problems, deck },
      location: `/decks/${deck.key}`
    }
  }

  // eslint-disable-next-line no-unused-vars
  let { problems: removedProblems, deck: removed, ...newSession } = session
  try {
    const result = await upsertDeck({ key: id, ...deck })
    return {
      session: newSession,
      json: { deck: result },
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
