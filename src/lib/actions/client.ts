"use client";

import { createClient } from "../supabase/client";

export async function getListOfRandomText(): Promise<{ quote: string }[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("typetrails")
    .select("quote")
    .in("category", ["humor"]);
  if (error)
    return [
      {
        quote: `A demigod!" one snarled."Eat it!" yelled another.But that's as far as they got before I slashed a wide arc with Riptide and vaporized the entire front row of monsters."Back off!" I yelled at the rest, trying to sound fierce. Behind them stood their instructor--a six-foot tall telekhine with Doberman fangs snarling at me. I did my best to stare him down."New lesson, class," I announced. "Most monsters will vaporize when sliced with a celestial bronze sword. This change is completely normal, and will happen to you right now if you don't BACK OFF!"To my surprise, it worked. The monsters backed off, but there was at least twenty of them. My fear factor wasn't going to last that long.I jumped out of the cart, yelled, "CLASS DISMISSED!" and ran for the exit.`,
      },
    ];
  return data;
}
