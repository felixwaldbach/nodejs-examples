CREATE TYPE edgewood.os(user text, arch text, cpus list<frozen<cpu>>, type text, memory int, network_lo list<frozen<nic>>, network_eth0 list<frozen<nic>>, release text, platform text);
CREATE TABLE IF NOT EXISTS edgewood.deviceinfo (
	uuid text PRIMARY KEY,
	apps_stat int,
	auth_stat int,
	configchanged boolean,
	info_stat int,
	manu text,
	mntr_stat int,
	model text,
	name text,
	newversion boolean,
	os frozen<os>,
	serv text,
	user text,
	apps list<frozen<action>>,
	cnfg_stat list<int>,
	cnfg_steps list<frozen<action>>,
	mntr list<frozen<action>>)
	WITH ID = 13828350-91fb-11e9-bcd4-c912c72dd802
	AND bloom_filter_fp_chance = 0.01
	AND dclocal_read_repair_chance = 0.1
	AND crc_check_chance = 1.0
	AND default_time_to_live = 0
	AND gc_grace_seconds = 864000
	AND min_index_interval = 128
	AND max_index_interval = 2048
	AND memtable_flush_period_in_ms = 0
	AND read_repair_chance = 0.0
	AND speculative_retry = '99PERCENTILE'
	AND comment = ''
	AND caching = { 'keys': 'ALL', 'rows_per_partition': 'NONE' }
	AND compaction = { 'max_threshold': '32', 'min_threshold': '4', 'class': 'org.apache.cassandra.db.compaction.SizeTieredCompactionStrategy' }
	AND compression = { 'chunk_length_in_kb': '64', 'class': 'org.apache.cassandra.io.compress.LZ4Compressor' }
	AND cdc = false
	AND extensions = {  };
