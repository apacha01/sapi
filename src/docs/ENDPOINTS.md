
# API
URL: `https://sapi.up.railway.app/api/v1/`


## Endpoints List
### Resources
| Resource | Endpoint | Implemented |
|  --------  |  --------  |  -----------  |
| Foods |  `/foods`  | yes |
| Pack |  `/packs`  | yes |
| Pets |  `/pets`  | yes |
| Tokens |  `/tokens`  | yes |
| Toys |  `/toys`  | yes |
| Hard mode Toys | not available yet | no |
| Users |  `/users`  | yes |
The users endpoint is only available for `admin` users.

### Services
| Services | Endpoint | Implemented |
|  --------  |  --------  |  -----------  |
| Log in |  `/login`  | yes |
| Sign up | not available yet | no |


## Resources
Calling any of the endpoints provided above will result in a **FULL** response of all available resources for that API (no pagination).

### GET /api/v1/{endpoint}
###### Response format for any endpoint:
```json
{
  "code": 200,
  "message": "Ok.",
  "content": { ... },
  "description": "",
  "documentationURL": ""
}
```
| Name | Description |
| ------- | -------- |
| code | Response HTTP code |
| message | Response HTTP message |
| content | The actual information requested |
| description | A more detailed explanation of the response if needed (mainly for errors) |
| documentationURL | The documentation URL (mainly for errors) |

## Foods
Foods are items that the pets can consume / hold. Held foods are called perks and are differentiated from consumable foods with a `perk` boolean property. This endpoint includes all, held and consumable, foods.

### GET /api/v1/foods/{id or name}
###### Example response of a named food:
```json
{
  "code": 200,
  "message": "Ok.",
  "content": {
    "_id": "653dedc4b403a5f0fda5a1e8",
    "name": "honey",
    "shop_tier": {
      "shop_tier": 1,
      "url": "https://sapi.up.railway.app/api/v1/foods?tier=1"
    },
    "sources": [
      {
        "source": "Shop in Turtle Pack.",
        "url": "https://sapi.up.railway.app/api/v1/packs/6541791bb961e4672bbd987b"
      }, 
      ...
    ],
    "effect": "Summon one 1/1 Bee after fainting.",
    "perk": true,
    "sprites": {
      "standard": "https://raw.githubusercontent.com/apacha01/assets/sap/super-auto-pets/foods/standard/Honey.png",
      "classic": "https://raw.githubusercontent.com/apacha01/assets/sap/super-auto-pets/foods/classic/Honey_Classic.png"
    }
  },
  "description": "",
  "documentationURL": ""
}
```
###### Food model:
| Name | Description |
| ------- | -------- |
| _id | Identifier for this food |
| name | Name of this food |
| shop_tier | The shop tier from which this food can be bought |
| sources | An array containing all possible ways to obtain this food |
| effect | The effect this food has on the pet |
| perk | Whether the food is perk (held) or not (consumable) |
| sprites | The current and previous (if exists) sprite of this pet |

## Packs
Packs are the combination of food and pets for the game. You can select a pack with a predetermined set of pets and foods or you can build your own (custom). 

### GET /api/v1/packs/{id or name}
###### Example response of a named pack:
```json
{
  "code": 200,
  "message": "Ok.",
  "content": {
    "_id": "6541791bb961e4672bbd987b",
    "name": "turtle",
    "pets": {
      "tier_1_pets": [ ... ],
      "tier_2_pets": [ ... ],
      "tier_3_pets": [ ... ],
      "tier_4_pets": [ ... ],
      "tier_5_pets": [ ... ],
      "tier_6_pets": [ ... ]
    },
    "foods": {
      "tier_1_foods": [ ... ],
      "tier_2_foods": [ ... ],
      "tier_3_foods": [ ... ],
      "tier_4_foods": [ ... ],
      "tier_5_foods": [ ... ],
      "tier_6_foods": [ ... ]
    },
    "description": "The Turtle Pack is the first pack in Super Auto Pets and is immediately available to all players for free."
  },
  "description": "",
  "documentationURL": ""
}
```
###### Pack model:
| Name | Description |
| ------- | -------- |
| _id | Identifier for this pack |
| name | Name of this pack |
| pets | An object for all the pets for each tier this pack contains |
| foods | An object for all the foods for each tier this pack contains |
| description | A small description of the pack (like the rules in custom pack) |

## Pets
Pets are the fighting units in this auto battler. You can level them up, stat them up and give them foods to boost their own abilities.

### GET /api/v1/pets/{id or name}
###### Example response of a named pet:
```json
{
  "code": 200,
  "message": "Ok.",
  "content": {
    "_id": "653deb8dcd691554e612a673",
    "name": "ant",
    "tier_info": {
      "tier": 1,
      "url": "https://sapi.com/api/v1/pets?tier=1"
    },
    "sprites": {
      "standard": "https://raw.githubusercontent.com/apacha01/assets/sap/super-auto-pets/pets/standard/Ant.png",
      "classic": "https://raw.githubusercontent.com/apacha01/assets/sap/super-auto-pets/pets/classic/Ant_Classic.png"
    },
    "abilities": {
      "lv1_ability": "Give one random friend +1 attack and +1 health.",
      "lv2_ability": "Give one random friend +2 attack and +2 health.",
      "lv3_ability": "Give one random friend +3 attack and +3 health."
    },
    "ability_trigger": {
      "name": "faint",
      "url": "https://sapi.com/api/v1/pets?trigger=faint"
    },
    "ability_target": {
      "name": "friends",
      "url": [
        "https://sapi.com/api/v1/pets/",
        "https://sapi.com/api/v1/tokens/"
      ]
    },
    "type": {
      "name": "scaler",
      "url": "https://sapi.com/api/v1/pets?type=scaler"
    },
    "stats": [
      {
        "name": "hp",
        "base_stat": 2,
        "url": "https://sapi.com/api/v1/stats/hp"
      },
      {
        "name": "attack",
        "base_stat": 2,
        "url": "https://sapi.com/api/v1/stats/atk"
      }
    ],
    "packs": [
      {
        "name": "turtle",
        "url": "https://sapi.com/api/v1/packs/6541791bb961e4672bbd987b"
      },
      ...
    ]
  },
  "description": "",
  "documentationURL": ""
}
```
###### Pet model:
| Name | Description |
| ------- | -------- |
| _id | Identifier for this pet |
| name | Name of this pet |
| tier_info | The tier from which this pet can be bought |
| sprites | The current and previous (if exists) sprite of this pet |
| abilities | The ability for each level (1 to 3) of this pet |
| ability_trigger | The action that triggers this pet ability |
| ability_target | To who affects this pet ability |
| type | The type of this pet |
| stats | The initial stats upon first buying the pet |
| packs | An array containing all the packs this pet is in |

## Tokens
Tokens are a special type of unit that gets summoned after a certain event happened, whether it's because of a pet or a food, both can trigger the summoning of a token. This type mostly doesn't have an ability, although there are exceptions like the `Butterfly`.

### GET /api/v1/tokens/{id or name}
###### Example response of a named token:
```json
{
  "code": 200,
  "message": "Ok.",
  "content": {
    "_id": "653ecfb8c9477b085d3d1b0c",
    "name": "chick",
    "tier_info": {
      "tier": 1,
      "url": "https://sapi.com/api/v1/tokens?tier=1"
    },
    "sprites": {
      "standard": "https://raw.githubusercontent.com/apacha01/assets/sap/super-auto-pets/tokens/standard/Chick.png",
      "classic": "https://raw.githubusercontent.com/apacha01/assets/sap/super-auto-pets/tokens/classic/Chick_Classic.png"
    },
    "abilities": {
      "lv1_ability": "",
      "lv2_ability": "",
      "lv3_ability": ""
    },
    "summoned_from": {
      "source": "A Rooster once it faints.",
      "url": "https://sapi.com/api/v1/pets/653deb8dcd691554e612a71e"
    },
    "stats": {
      "lv1_stats": [
        {
          "name": "hp",
          "base_stat": 1,
          "url": "https://sapi.com/api/v1/stats/hp"
        },
        {
          "name": "attack",
          "base_stat": 0,
          "url": "https://sapi.com/api/v1/stats/atk"
        }
      ],
      "lv2_stats": [
        {
          "name": "hp",
          "base_stat": 1,
          "url": "https://sapi.com/api/v1/stats/hp"
        },
        {
          "name": "attack",
          "base_stat": 0,
          "url": "https://sapi.com/api/v1/stats/atk"
        }
      ],
      "lv3_stats": [
        {
          "name": "hp",
          "base_stat": 1,
          "url": "https://sapi.com/api/v1/stats/hp"
        },
        {
          "name": "attack",
          "base_stat": 0,
          "url": "https://sapi.com/api/v1/stats/atk"
        }
      ]
    },
    "notes": "Stats on 0 are replaceable for half of the Rooster's attack."
  },
  "description": "",
  "documentationURL": ""
}
```
###### Tokens model:
| Name | Description |
| ------- | -------- |
| _id | Identifier for this token |
| name | Name of this token |
| tier_info | The tier of this token (all tokens are tier 1) |
| sprites | The current and previous (if exists) sprite of this token |
| abilities | The ability for each level (1 to 3) of this token |
| summoned_from | The pet or food that summoned this token |
| stats | The stats for each level (1 to 3) of this token |
| notes | Additional information relevant to the token (this is very important for tokens like the `Chick` or the `Golden Retriever`) |

## Toys
Toys are special objects that can be obtained only with certain pets. This give either an extra benefit to your team or a setback for your opponent. This is a relatively new mechanic so in these cases no toy has a sprite for the old version of the game.

### GET /api/v1/toys/{id or name}
###### Example response of a named toys:
```json
{
  "code": 200,
  "message": "Ok.",
  "content": {
    "_id": "653dedd8c9d4f6a8558ed994",
    "name": "balloon",
    "tier_info": {
      "tier": 1,
      "url": "https://sapi.com/api/v1/toys?tier=1"
    },
    "source": {
      "name": "ferret",
      "url": "https://sapi.com/api/v1/pets/653deb8dcd691554e612a681"
    },
    "ability_trigger": {
      "trigger": "on_break",
      "url": "https://sapi.com/api/v1/toys?trigger=on_break"
    },
    "abilities": {
      "lv1_ability": "Give +1 attack to the right-most friend.",
      "lv2_ability": "Give +2 attack to the right-most friend.",
      "lv3_ability": "Give +3 attack to the right-most friend."
    },
    "sprites": {
      "standard": "https://raw.githubusercontent.com/apacha01/assets/sap/super-auto-pets/toys/standard/Balloon.png",
      "classic": ""
    }
  },
  "description": "",
  "documentationURL": ""
}
```
###### Toy model:
| Name | Description |
| ------- | -------- |
| _id | Identifier for this toy |
| name | Name of this toy |
| tier_info | The tier of this toy (all toys are the same tier as the pet they are obtained from) |
| source | The pet from which this toy is obtained from |
| ability_trigger | The action that triggers the ability of this toy |
| abilities | The ability for each level (1 to 3) of this toy |
| sprites | The current and previous (if exists) sprite of this toy |

## Users
This isn't part of the game, it's just the login system for the API. Only users with the role `admin` can use this endpoint, if tried to access without a token, you'll be rejected. The token should be provided through a special header called `x-auth-token`.  To obtain the token just make a `POST` request to the `/login` path which will return a simple object with one property: token. 

### GET /api/v1/users/{id or name}
###### Example response of a named user:
```json
{
  "code": 200,
  "message": "Ok.",
  "content": {
    "_id": "653deddf314253d95a752c7d",
    "password": "21117e2604648843f3da1c589eee864a102be9d5ee1c4e302beba1a25326d53924a7ae1d410f7823db9f0ef31a931e66",
    "role": "admin",
    "name": "admin"
  },
  "description": "",
  "documentationURL": ""
}
```
###### User model:
| Name | Description |
| ------- | -------- |
| _id | Identifier for this user |
| name | Name of this user |
| password | Encrypted password of the user |
| role | The role of the user. Can be either `admin` or `user` |