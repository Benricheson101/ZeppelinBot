{set("server_id", args.0)}
{set("total_shards", args.1)}
{set("shard_id", mod(rightShift(get("server_id"), 22), get("total_shards")))}

Server `{get("server_id")}` is on shard **{get("shard_id")}/{get("total_shards")}**
