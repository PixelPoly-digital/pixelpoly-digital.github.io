var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.createTemplateTagFirstArg = function(a) {
	return a.raw = a
};
$jscomp.createTemplateTagFirstArgWithRaw = function(a, c) {
	a.raw = c;
	return a
};
var formatVersion = document.getElementById("format_version"),
	itemSettings = document.getElementById("item.settings"),
	identifier = document.getElementById("identifier"),
	category = document.getElementById("category"),
	isExp = document.getElementById("is_experimental"),
	icon = document.getElementById("minecraft:icon"),
	displayName = document.getElementById("minecraft:display_name"),
	maxStackSize = document.getElementById("minecraft:max_stack_size"),
	useAnimCheckbox = document.getElementById("minecraft:use_animation.checkbox"),
	useAnim = document.getElementById("minecraft:use_animation"),
	foil = document.getElementById("minecraft:foil"),
	useDuration = document.getElementById("minecraft:use_duration"),
	stackedData = document.getElementById("minecraft:stacked_by_data"),
	handEquipped = document.getElementById("minecraft:hand_equipped"),
	destroyInC = document.getElementById("minecraft:can_destroy_in_creative"),
	ccategoryCheckbox = document.getElementById("minecraft:creative_category.checkbox"),
	ccategory = document.getElementById("minecraft:creative_category"),
	foodCheckbox = document.getElementById("minecraft:food.checkbox"),
	foodPanel = document.getElementById("minecraft:food.panel"),
	foodNutr = document.getElementById("minecraft:food.nutrition"),
	foodSatu = document.getElementById("minecraft:food.saturation_modifier"),
	foodCanA = document.getElementById("minecraft:food.can_always_eat"),
	foodConvert = document.getElementById("minecraft:food.convert"),
	isexplod = document.getElementById("minecraft:explodable"),
	allowOffHand = document.getElementById("minecraft:allow_off_hand"),
	wearableCheckbox = document.getElementById("minecraft:wearable.checkbox"),
	wearablePanel = document.getElementById("minecraft:wearable.panel"),
	wearableSlot = document.getElementById("minecraft:wearable.slot"),
	armorProtection = document.getElementById("minecraft:armor"),
	cooldownCheckbox = document.getElementById("minecraft:cooldown.checkbox"),
	cooldownPanel = document.getElementById("minecraft:cooldown.panel"),
	cooldownCategory = document.getElementById("minecraft:cooldown.category"),
	cooldownDuration = document.getElementById("minecraft:cooldown.duration"),
	damage = document.getElementById("minecraft:damage"),
	blockPlacerCheckbox = document.getElementById("minecraft:block_placer.checkbox"),
	blockPlacerPanel = document.getElementById("minecraft:block_placer.panel"),
	blockPlacerBlock = document.getElementById("minecraft:block_placer.block"),
	blockPlacerDes = document.getElementById("minecraft:block_placer.block_description"),
	entityPlacerCheckbox = document.getElementById("minecraft:entity_placer.checkbox"),
	entityPlacerPanel = document.getElementById("minecraft:entity_placer.panel"),
	entityPlacerEntity = document.getElementById("minecraft:entity_placer.entity"),
	entityPlacerUseon = document.getElementById("minecraft:entity_placer.use_on"),
	entityPlacerDison = document.getElementById("minecraft:entity_placer.dispense_on"),
	enchantableCheckbox = document.getElementById("minecraft:enchantable.checkbox"),
	enchantablePanel = document.getElementById("minecraft:enchantable.panel"),
	enchantableSlot = document.getElementById("minecraft:enchantable.slot"),
	enchantableValue = document.getElementById("minecraft:enchantable.value"),
	shooterCheckbox = document.getElementById("minecraft:shooter.checkbox"),
	shooterPanel = document.getElementById("minecraft:shooter.panel"),
	shooterMaxDraw = document.getElementById("minecraft:shooter.max_draw_duration"),
	shooterCharge = document.getElementById("minecraft:shooter.charge"),
	shooterScale = document.getElementById("minecraft:shooter.scale"),
	shooterAmmoCheckbox = document.getElementById("minecraft:shooter.ammo.checkbox"),
	shooterAmmoPanel = document.getElementById("minecraft:shooter.ammo.panel"),
	shooterAmmoInven =
	document.getElementById("minecraft:shooter.inven"),
	shooterAmmoItem = document.getElementById("minecraft:shooter.item"),
	shooterAmmoHand = document.getElementById("minecraft:shooter.offhand"),
	shooterAmmoCreative = document.getElementById("minecraft:shooter.creative"),
	fertilizer = document.getElementById("minecraft:fertilizer"),
	ignPerms = document.getElementById("minecraft:ignores_permission"),
	miningSpeed = document.getElementById("minecraft:mining_speed"),
	liquidClipped = document.getElementById("minecraft:liquid_clipped"),
	shouldDespawn = document.getElementById("minecraft:should_despawn"),
	mirroredArt = document.getElementById("minecraft:mirrored_art"),
	projectileCheckbox = document.getElementById("minecraft:projectile.checkbox"),
	projectilePanel = document.getElementById("minecraft:projectile.panel"),
	projectileEntity = document.getElementById("minecraft:projectile.entity"),
	projectilePower = document.getElementById("minecraft:projectile.power"),
	dyeCheckbox = document.getElementById("minecraft:dye_powder.checkbox"),
	dyePowder = document.getElementById("minecraft:dye_powder"),
	throwableCheckbox = document.getElementById("minecraft:throwable.checkbox"),
	throwablePanel = document.getElementById("minecraft:throwable.panel"),
	throwableSwing = document.getElementById("minecraft:throwable.swing"),
	throwablePower = document.getElementById("minecraft:throwable.power"),
	throwableDraw = document.getElementById("minecraft:throwable.draw"),
	code = document.getElementById("item.code"),
	download = document.getElementById("item.download"),
	copy = document.getElementById("item.copy");

function writeItem() {
	var a = {};
	a.format_version = formatVersion.value;
	a["minecraft:item"] = {};
	a["minecraft:item"].description = {};
	a["minecraft:item"].description.identifier = identifier.value;
	a["minecraft:item"].description.category = category.value;
	isExp.checked && (a["minecraft:item"].description.is_experimental = isExp.checked);
	a["minecraft:item"].components = {};
	"" !== icon.value && (a["minecraft:item"].components["minecraft:icon"] = {}, a["minecraft:item"].components["minecraft:icon"].texture = identifier.value.split(":")[1] +
		".texture");
	if (document.getElementById("enable.item_atlas").checked) {
		if ("" !== icon.value) {
			var c = {
				resource_pack_name: "vanilla",
				texture_name: "atlas.items",
				texture_data: {}
			};
			c.texture_data[identifier.value.split(":")[1] + ".texture"] = {};
			c.texture_data[identifier.value.split(":")[1] + ".texture"].textures = icon.value;
			document.getElementById("item.atlas").value = JSON.stringify(c, null, 2)
		}
		document.getElementById("item.atlas_div").style.display = "block"
	} else document.getElementById("item.atlas_div").style.display =
		"none", document.getElementById("item.atlas").value = "";
	"" !== displayName.value && (a["minecraft:item"].components["minecraft:display_name"] = {}, a["minecraft:item"].components["minecraft:display_name"].value = displayName.value);
	1 <= maxStackSize.value && 64 >= maxStackSize.value && (a["minecraft:item"].components["minecraft:max_stack_size"] = parseInt(maxStackSize.value));
	foil.checked && (a["minecraft:item"].components["minecraft:foil"] = foil.checked);
	useAnimCheckbox.checked ? (useAnim.disabled = !1, "none" !== useAnim.value &&
		(a["minecraft:item"].components["minecraft:use_animation"] = useAnim.value)) : useAnim.disabled = !0;
	"" !== useDuration.value && (a["minecraft:item"].components["minecraft:use_duration"] = parseFloat(useDuration.value));
	stackedData.checked && (a["minecraft:item"].components["minecraft:stacked_by_data"] = stackedData.checked);
	handEquipped.checked && (a["minecraft:item"].components["minecraft:hand_equipped"] = handEquipped.checked);
	destroyInC.checked || (a["minecraft:item"].components["minecraft:can_destroy_in_creative"] =
		destroyInC.checked);
	ccategoryCheckbox.checked ? (ccategory.disabled = !1, a["minecraft:item"].components["minecraft:creative_category"] = {}, "none" !== ccategory.value && (a["minecraft:item"].components["minecraft:creative_category"].parent = ccategory.value)) : ccategory.disabled = !0;
	foodCheckbox.checked ? (foodPanel.style.display = "block", a["minecraft:item"].components["minecraft:food"] = {}, "" !== foodNutr.value && (a["minecraft:item"].components["minecraft:food"].nutrition = parseFloat(foodNutr.value)), "" !== foodSatu.value &&
		(a["minecraft:item"].components["minecraft:food"].saturation_modifier = foodSatu.value), a["minecraft:item"].components["minecraft:food"].can_always_eat = foodCanA.checked, "" !== foodConvert.value && (a["minecraft:item"].components["minecraft:food"].using_converts_to = foodConvert.value)) : foodPanel.style.display = "none";
	isexplod.checked || (a["minecraft:item"].components["minecraft:explodable"] = isexplod.checked);
	allowOffHand.checked && (a["minecraft:item"].components["minecraft:allow_off_hand"] = allowOffHand.checked);
	wearableCheckbox.checked ? (wearablePanel.style.display = "block", a["minecraft:item"].components["minecraft:wearable"] = {}, "none" !== wearableSlot.value && (a["minecraft:item"].components["minecraft:wearable"].slot = wearableSlot.value)) : wearablePanel.style.display = "none";
	"" !== armorProtection.value && 20 >= armorProtection.value && 0 <= armorProtection.value && (a["minecraft:item"].components["minecraft:armor"] = {}, a["minecraft:item"].components["minecraft:armor"].protection = parseInt(armorProtection.value));
	cooldownCheckbox.checked ?
		(cooldownPanel.style.display = "block", a["minecraft:item"].components["minecraft:cooldown"] = {}, "" !== cooldownCategory.value && (a["minecraft:item"].components["minecraft:cooldown"].category = cooldownCategory.value), "" !== cooldownDuration.value && 0 <= cooldownDuration.value && (a["minecraft:item"].components["minecraft:cooldown"].duration = parseFloat(cooldownDuration.value))) : cooldownPanel.style.display = "none";
	"" !== damage.value && 0 <= damage.value && (a["minecraft:item"].components["minecraft:damage"] = parseInt(damage.value));
	blockPlacerCheckbox.checked ? (blockPlacerPanel.style.display = "block", a["minecraft:item"].components["minecraft:block_placer"] = {}, "" !== blockPlacerBlock.value && (a["minecraft:item"].components["minecraft:block_placer"].block = blockPlacerBlock.value), blockPlacerDes.checked && (a["minecraft:item"].components["minecraft:block_placer"].use_block_description = blockPlacerDes.checked)) : blockPlacerPanel.style.display = "none";
	entityPlacerCheckbox.checked ? (entityPlacerPanel.style.display = "block", a["minecraft:item"].components["minecraft:entity_placer"] = {}, "" !== entityPlacerEntity.value && (a["minecraft:item"].components["minecraft:entity_placer"].entity = entityPlacerEntity.value), "" !== entityPlacerUseon.value && (a["minecraft:item"].components["minecraft:entity_placer"].use_on = [], a["minecraft:item"].components["minecraft:entity_placer"].use_on = entityPlacerUseon.value.split(",")), "" !== entityPlacerDison.value && (a["minecraft:item"].components["minecraft:entity_placer"].dispense_on = [], a["minecraft:item"].components["minecraft:entity_placer"].dispense_on = entityPlacerDison.value.split(","))) :
		entityPlacerPanel.style.display = "none";
	enchantableCheckbox.checked ? (enchantablePanel.style.display = "block", a["minecraft:item"].components["minecraft:enchantable"] = {}, "none" !== enchantableSlot.value && (a["minecraft:item"].components["minecraft:enchantable"].slot = enchantableSlot.value), "" !== enchantableValue.value && 0 <= enchantableValue.value && (a["minecraft:item"].components["minecraft:enchantable"].value = parseInt(enchantableValue.value))) : enchantablePanel.style.display = "none";
	shooterCheckbox.checked ? (shooterPanel.style.display =
			"block", a["minecraft:item"].components["minecraft:shooter"] = {}, "" !== shooterMaxDraw.value && 1 <= shooterMaxDraw.value && (a["minecraft:item"].components["minecraft:shooter"].max_draw_duration = parseFloat(shooterMaxDraw.value)), a["minecraft:item"].components["minecraft:shooter"].charge_on_draw = shooterCharge.checked, a["minecraft:item"].components["minecraft:shooter"].scale_power_by_draw_duration = shooterScale.checked, shooterAmmoCheckbox.checked ? (shooterAmmoPanel.style.display = "block", a["minecraft:item"].components["minecraft:shooter"].ammunition = [{}], a["minecraft:item"].components["minecraft:shooter"].ammunition[0].search_inventory = shooterAmmoInven.checked, "" !== shooterAmmoItem.value && (a["minecraft:item"].components["minecraft:shooter"].ammunition[0].item = shooterAmmoItem.value), a["minecraft:item"].components["minecraft:shooter"].ammunition[0].use_offhad = shooterAmmoHand.checked, a["minecraft:item"].components["minecraft:shooter"].ammunition[0].use_in_creative = shooterAmmoCreative.checked) : shooterAmmoPanel.style.display = "none") : shooterPanel.style.display =
		"none";
	"" !== fertilizer.value && 0 <= fertilizer.value && (a["minecraft:item"].components["minecraft:fertilizer"] = {}, a["minecraft:item"].components["minecraft:fertilizer"].duration = parseInt(fertilizer.value));
	ignPerms.checked && (a["minecraft:item"].components["minecraft:ignores_permission"] = ignPerms.checked);
	"" !== miningSpeed.value && 0 <= miningSpeed.value && (a["minecraft:item"].components["minecraft:mining_speed"] = parseInt(miningSpeed.value));
	liquidClipped.checked && (a["minecraft:item"].components["minecraft:liquid_clipped"] =
		liquidClipped.checked);
	shouldDespawn.checked || (a["minecraft:item"].components["minecraft:should_despawn"] = shouldDespawn.checked);
	mirroredArt.checked && (a["minecraft:item"].components["minecraft:mirrored_art"] = mirroredArt.checked);
	projectileCheckbox.checked ? (projectilePanel.style.display = "block", a["minecraft:item"].components["minecraft:projectile"] = {}, "" !== projectileEntity.value && (a["minecraft:item"].components["minecraft:projectile"].projectile_entity = projectileEntity.value), "" !== projectilePower.value &&
		0 <= projectilePower.value && (a["minecraft:item"].components["minecraft:projectile"].minimum_critical_power = parseFloat(projectilePower.value))) : projectilePanel.style.display = "none";
	dyeCheckbox.checked ? (dyePowder.disabled = !1, a["minecraft:item"].components["minecraft:dye_powder"] = {}, a["minecraft:item"].components["minecraft:dye_powder"].color = dyePowder.value) : dyePowder.disabled = !0;
	throwableCheckbox.checked ? (throwablePanel.style.display = "block", a["minecraft:item"].components["minecraft:throwable"] = {}, a["minecraft:item"].components["minecraft:throwable"].do_swing_animation =
		throwableSwing.checked, 0 <= throwableDraw.value && "" !== throwableDraw.value && (a["minecraft:item"].components["minecraft:throwable"].max_draw_duration = parseFloat(throwableDraw.value)), a["minecraft:item"].components["minecraft:throwable"].scale_power_by_draw_duration = throwablePower.checked) : throwablePanel.style.display = "none";
	code.value = JSON.stringify(a, null, 2);
	copy.onclick = function() {
		code.select();
		code.setSelectionRange(0, code.value.length);
		document.execCommand("copy")
	};
	download.onclick = function() {
		var d =
			new Blob([code.value], {
				type: "text/plain"
			}),
			b = document.createElement("a");
		b.download = identifier.value.split(":")[1] + ".item.json";
		b.innerHTML = "Save";
		null != window.webkitURL ? b.href = window.webkitURL.createObjectURL(d) : (b.href = window.URL.createObjectURL(d), b.onclick = destroyClickedElement, b.style.display = "none", document.body.appendChild(b));
		b.click()
	}
}
writeItem();
