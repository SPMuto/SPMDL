const SUPABASE_URL =
    "https://ooemyrjfpsmehtbfionr.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_KeHDgndyqbZlxUZ5U30nkw_OPhl2NG6";

// =====================================================
// SUPABASE CLIENT
// =====================================================

if (!window.supabase) {

    console.error(
        "❌ Library Supabase tidak dimuat."
    );

} else {

    window.supabaseClient =
        window.supabase.createClient(
            SUPABASE_URL,
            SUPABASE_KEY
        );

    console.log(
        "✅ SUPABASE CLIENT READY"
    );

}
