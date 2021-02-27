let formatVersion = document.getElementById("format_version");
let itemSettings = document.getElementById("item.settings");
let identifier = document.getElementById("identifier");
let category = document.getElementById("category");
let isExp = document.getElementById("is_experimental");
let icon = document.getElementById("minecraft:icon");
let displayName = document.getElementById("minecraft:display_name");
let maxStackSize = document.getElementById("minecraft:max_stack_size");
let useAnimCheckbox = document.getElementById("minecraft:use_animation.checkbox");
let useAnim = document.getElementById("minecraft:use_animation");
let foil = document.getElementById("minecraft:foil");
let useDuration = document.getElementById("minecraft:use_duration");
let stackedData = document.getElementById("minecraft:stacked_by_data");
let handEquipped = document.getElementById("minecraft:hand_equipped");
let destroyInC = document.getElementById("minecraft:can_destroy_in_creative");
let ccategoryCheckbox = document.getElementById("minecraft:creative_category.checkbox");
let ccategory = document.getElementById("minecraft:creative_category");
let foodCheckbox = document.getElementById("minecraft:food.checkbox");
let foodPanel = document.getElementById("minecraft:food.panel");
let foodNutr = document.getElementById("minecraft:food.nutrition");
let foodSatu = document.getElementById("minecraft:food.saturation_modifier");
let foodCanA = document.getElementById("minecraft:food.can_always_eat");
let foodConvert = document.getElementById("minecraft:food.convert");
let isexplod = document.getElementById("minecraft:explodable");
let allowOffHand = document.getElementById("minecraft:allow_off_hand");
let wearableCheckbox = document.getElementById("minecraft:wearable.checkbox");
let wearablePanel = document.getElementById("minecraft:wearable.panel");
let wearableSlot = document.getElementById("minecraft:wearable.slot");
let armorProtection = document.getElementById("minecraft:armor");
let cooldownCheckbox = document.getElementById("minecraft:cooldown.checkbox");
let cooldownPanel = document.getElementById("minecraft:cooldown.panel");
let cooldownCategory = document.getElementById("minecraft:cooldown.category");
let cooldownDuration = document.getElementById("minecraft:cooldown.duration");
let damage = document.getElementById("minecraft:damage");
let blockPlacerCheckbox = document.getElementById("minecraft:block_placer.checkbox");
let blockPlacerPanel = document.getElementById("minecraft:block_placer.panel");
let blockPlacerBlock = document.getElementById("minecraft:block_placer.block");
let blockPlacerDes = document.getElementById("minecraft:block_placer.block_description");
let entityPlacerCheckbox = document.getElementById("minecraft:entity_placer.checkbox");
let entityPlacerPanel = document.getElementById("minecraft:entity_placer.panel");
let entityPlacerEntity = document.getElementById("minecraft:entity_placer.entity");
let entityPlacerUseon = document.getElementById("minecraft:entity_placer.use_on");
let entityPlacerDison = document.getElementById("minecraft:entity_placer.dispense_on");
let enchantableCheckbox = document.getElementById("minecraft:enchantable.checkbox");
let enchantablePanel = document.getElementById("minecraft:enchantable.panel");
let enchantableSlot = document.getElementById("minecraft:enchantable.slot");
let enchantableValue = document.getElementById("minecraft:enchantable.value");
let shooterCheckbox = document.getElementById("minecraft:shooter.checkbox");
let shooterPanel = document.getElementById("minecraft:shooter.panel");
let shooterMaxDraw = document.getElementById("minecraft:shooter.max_draw_duration");
let shooterCharge = document.getElementById("minecraft:shooter.charge");
let shooterScale = document.getElementById("minecraft:shooter.scale");
let shooterAmmoCheckbox = document.getElementById("minecraft:shooter.ammo.checkbox");
let shooterAmmoPanel = document.getElementById("minecraft:shooter.ammo.panel");
let shooterAmmoInven = document.getElementById("minecraft:shooter.inven");
let shooterAmmoItem = document.getElementById("minecraft:shooter.item");
let shooterAmmoHand = document.getElementById("minecraft:shooter.offhand");
let shooterAmmoCreative = document.getElementById("minecraft:shooter.creative");
let fertilizer = document.getElementById("minecraft:fertilizer");
let ignPerms = document.getElementById("minecraft:ignores_permission");
let miningSpeed = document.getElementById("minecraft:mining_speed");
let liquidClipped = document.getElementById("minecraft:liquid_clipped");
let shouldDespawn = document.getElementById("minecraft:should_despawn");
let mirroredArt = document.getElementById("minecraft:mirrored_art");
let projectileCheckbox = document.getElementById("minecraft:projectile.checkbox");
let projectilePanel = document.getElementById("minecraft:projectile.panel");
let projectileEntity = document.getElementById("minecraft:projectile.entity");
let projectilePower = document.getElementById("minecraft:projectile.power");
let dyeCheckbox = document.getElementById("minecraft:dye_powder.checkbox");
let dyePowder = document.getElementById("minecraft:dye_powder");
let throwableCheckbox = document.getElementById("minecraft:throwable.checkbox");
let throwablePanel = document.getElementById("minecraft:throwable.panel");
let throwableSwing = document.getElementById("minecraft:throwable.swing");
let throwablePower = document.getElementById("minecraft:throwable.power");
let throwableDraw = document.getElementById("minecraft:throwable.draw");
let knockbackResis = document.getElementById("minecraft:knockback_resistance");
let fuel = document.getElementById("minecraft:fuel");
let recordCheckbox = document.getElementById("minecraft:record.checkbox");
let recordPanel = document.getElementById("minecraft:record.panel");
let recordSound = document.getElementById("minecraft:record.sound");
let recordDuration = document.getElementById("minecraft:record.duration");
let recordSignal = document.getElementById("minecraft:record.signal");
let itemIconFile = document.getElementById("item.icon_file");
let itemIcon = document.getElementById("item.icon");
let itemName = document.getElementById("item.name");
let downloadPack = document.getElementById("download.pack");
let code = document.getElementById("item.code");
let download = document.getElementById("item.download");
let copy = document.getElementById("item.copy");


let is_valid_identifier = verifyIdentifier();
function verifyIdentifier() {
    return (identifier, ignore_default_namespaces = false) => {
        if (identifier.match(":")) {
            if ((identifier.startsWith("minecraft") || identifier.startsWith("minecon")) && ignore_default_namespaces === false) {
                return Boolean(false);
            } else {
                let format_special_characters = /[!@#$%^&*()+\-=\[\]{};'"\\|,<>\/?]+/;
                if (format_special_characters.test(identifier)) {
                    return Boolean(false);
                } else {
                    return (identifier.startsWith(":") || identifier.startsWith(".")) ? Boolean(false) : Boolean(true);
                }
            }
        } else {
            return Boolean(false);
        }
    };
};

function writeItem() {
    let item = {};
    item.format_version = formatVersion.value;
    item["minecraft:item"] = {};
    item["minecraft:item"].description = {};
    if (is_valid_identifier(identifier.value)) {
        item["minecraft:item"].description.identifier = identifier.value.toLowerCase();
        document.getElementById("invalid.identifier").style.display = "none";
    } else {
        document.getElementById("invalid.identifier").style.display = "block";
    };
    item["minecraft:item"].description.category = category.value;
    if (isExp.checked) {
        item["minecraft:item"].description.is_experimental = isExp.checked;
    };

    item["minecraft:item"].components = {};

    if (icon.value !== "" && is_valid_identifier(identifier.value)) {
        item["minecraft:item"].components["minecraft:icon"] = {};
        item["minecraft:item"].components["minecraft:icon"].texture = `${identifier.value.split(":")[1].toLowerCase()}.texture`;
    };
    if (document.getElementById("enable.item_atlas").checked) {
        if (icon.value !== "") {
            let itemAtlas = {};
            itemAtlas.resource_pack_name = "vanilla",
            itemAtlas.texture_name = "atlas.items",
            itemAtlas.texture_data = {};
            if (is_valid_identifier(identifier.value)) {
                itemAtlas.texture_data[`${identifier.value.split(":")[1].toLowerCase()}.texture`] = {};
                itemAtlas.texture_data[`${identifier.value.split(":")[1].toLowerCase()}.texture`].textures = icon.value;
            };
            document.getElementById("item.atlas").value = JSON.stringify(itemAtlas, null, 2);
        };
        document.getElementById("item.atlas_div").style.display = "block";
    } else {
        document.getElementById("item.atlas_div").style.display = "none";
        document.getElementById("item.atlas").value = "";
    };

    if (displayName.value !== "") {
        item["minecraft:item"].components["minecraft:display_name"] = {};
        item["minecraft:item"].components["minecraft:display_name"].value = displayName.value;
        itemName.innerHTML = displayName.value;
    } else {
        itemName.innerHTML = "Item name";
    };

    if (maxStackSize.value >= 1 && maxStackSize.value <= 64) {
        item["minecraft:item"].components["minecraft:max_stack_size"] = parseInt(maxStackSize.value);
    };

    if (foil.checked) {
        item["minecraft:item"].components["minecraft:foil"] = foil.checked;
    };

    if (useAnimCheckbox.checked) {
        useAnim.disabled = false;

        if (useAnim.value !== "none") {
            item["minecraft:item"].components["minecraft:use_animation"] = useAnim.value;
        };
    } else {
        useAnim.disabled = true;
    };

    if (useDuration.value !== "") {
        item["minecraft:item"].components["minecraft:use_duration"] = parseFloat(useDuration.value);
    };

    if (stackedData.checked) {
        item["minecraft:item"].components["minecraft:stacked_by_data"] = stackedData.checked;
    };

    if (handEquipped.checked) {
        item["minecraft:item"].components["minecraft:hand_equipped"] = handEquipped.checked;
    };

    if (!destroyInC.checked) {
        item["minecraft:item"].components["minecraft:can_destroy_in_creative"] = destroyInC.checked;
    };

    if (ccategoryCheckbox.checked) {
        ccategory.disabled = false;
        item["minecraft:item"].components["minecraft:creative_category"] = {};

        if (ccategory.value !== "none") {
            item["minecraft:item"].components["minecraft:creative_category"].parent = ccategory.value;
        };
    } else {
        ccategory.disabled = true;
    };

    if (foodCheckbox.checked) {
        foodPanel.style.display = "block";
        item["minecraft:item"].components["minecraft:food"] = {};

        if (foodNutr.value !== "" && foodNutr.value >= 0) {
            item["minecraft:item"].components["minecraft:food"].nutrition = parseFloat(foodNutr.value);
        };
        if (foodSatu.value !== "") {
            item["minecraft:item"].components["minecraft:food"].saturation_modifier = foodSatu.value;
        };
        item["minecraft:item"].components["minecraft:food"].can_always_eat = foodCanA.checked;
        if (foodConvert.value !== "") {
            item["minecraft:item"].components["minecraft:food"].using_converts_to = foodConvert.value;
        };
    } else {
        foodPanel.style.display = "none";
    };

    if (!isexplod.checked) {
        item["minecraft:item"].components["minecraft:explodable"] = isexplod.checked;
    };

    if (allowOffHand.checked) {
        item["minecraft:item"].components["minecraft:allow_off_hand"] = allowOffHand.checked;
    };

    if (wearableCheckbox.checked) {
        wearablePanel.style.display = "block";
        item["minecraft:item"].components["minecraft:wearable"] = {};
        if (wearableSlot.value !== "none") {
            item["minecraft:item"].components["minecraft:wearable"].slot = wearableSlot.value;
        };
    } else {
        wearablePanel.style.display = "none";
    };

    if (armorProtection.value !== "" && (armorProtection.value <= 20 && armorProtection.value >= 0)) {
        item["minecraft:item"].components["minecraft:armor"] = {};
        item["minecraft:item"].components["minecraft:armor"].protection = parseInt(armorProtection.value);
    };

    if (cooldownCheckbox.checked) {
        cooldownPanel.style.display = "block";
        item["minecraft:item"].components["minecraft:cooldown"] = {};
        if (cooldownCategory.value !== "") {
            item["minecraft:item"].components["minecraft:cooldown"].category = cooldownCategory.value;
        };
        if (cooldownDuration.value !== "" && cooldownDuration.value >= 0) {
            item["minecraft:item"].components["minecraft:cooldown"].duration = parseFloat(cooldownDuration.value);
        };
    } else {
        cooldownPanel.style.display = "none"
    };

    if (damage.value !== "" && damage.value >= 0) {
        item["minecraft:item"].components["minecraft:damage"] = parseInt(damage.value);
    };

    if (blockPlacerCheckbox.checked) {
        blockPlacerPanel.style.display = "block";
        item["minecraft:item"].components["minecraft:block_placer"] = {};

        if (blockPlacerBlock.value !== "") {
            item["minecraft:item"].components["minecraft:block_placer"].block = blockPlacerBlock.value;
        };
        if (blockPlacerDes.checked) {
            item["minecraft:item"].components["minecraft:block_placer"].use_block_description = blockPlacerDes.checked;
        };
    } else {
        blockPlacerPanel.style.display = "none";
    };
    if (entityPlacerCheckbox.checked) {
        entityPlacerPanel.style.display = "block";
        item["minecraft:item"].components["minecraft:entity_placer"] = {};

        if (entityPlacerEntity.value !== "") {
            item["minecraft:item"].components["minecraft:entity_placer"].entity = entityPlacerEntity.value;
        };
        if (entityPlacerUseon.value !== "") {
            item["minecraft:item"].components["minecraft:entity_placer"].use_on = [];
            let useOnBlocks = entityPlacerUseon.value;
            item["minecraft:item"].components["minecraft:entity_placer"].use_on = useOnBlocks.split(",");
        };
        if (entityPlacerDison.value !== "") {
            item["minecraft:item"].components["minecraft:entity_placer"].dispense_on = [];
            let disOnBlocks = entityPlacerDison.value;
            item["minecraft:item"].components["minecraft:entity_placer"].dispense_on = disOnBlocks.split(",");
        };
    } else {
        entityPlacerPanel.style.display = "none";
    };

    if (enchantableCheckbox.checked) {
        enchantablePanel.style.display = "block";
        item["minecraft:item"].components["minecraft:enchantable"] = {};

        if (enchantableSlot.value !== "none") {
            item["minecraft:item"].components["minecraft:enchantable"].slot = enchantableSlot.value;
        };
        if (enchantableValue.value !== "" && enchantableValue.value >= 0) {
            item["minecraft:item"].components["minecraft:enchantable"].value = parseInt(enchantableValue.value);
        };
    } else {
        enchantablePanel.style.display = "none";
    };

    if (shooterCheckbox.checked) {
        shooterPanel.style.display = "block";
        item["minecraft:item"].components["minecraft:shooter"] = {};

        if (shooterMaxDraw.value !== "" && shooterMaxDraw.value >= 1) {
            item["minecraft:item"].components["minecraft:shooter"].max_draw_duration = parseFloat(shooterMaxDraw.value);
        };
        item["minecraft:item"].components["minecraft:shooter"].charge_on_draw = shooterCharge.checked;
        item["minecraft:item"].components["minecraft:shooter"].scale_power_by_draw_duration = shooterScale.checked;

        if (shooterAmmoCheckbox.checked) {
            shooterAmmoPanel.style.display = "block";
            item["minecraft:item"].components["minecraft:shooter"].ammunition = [{}];

            item["minecraft:item"].components["minecraft:shooter"].ammunition[0].search_inventory = shooterAmmoInven.checked;
            if (shooterAmmoItem.value !== "") {
                item["minecraft:item"].components["minecraft:shooter"].ammunition[0].item = shooterAmmoItem.value;
            };
            item["minecraft:item"].components["minecraft:shooter"].ammunition[0].use_offhand = shooterAmmoHand.checked;
            item["minecraft:item"].components["minecraft:shooter"].ammunition[0].use_in_creative = shooterAmmoCreative.checked;
        } else {
            shooterAmmoPanel.style.display = "none";
        };
    } else {
        shooterPanel.style.display = "none";
    };

    if (fertilizer.value !== "" && fertilizer.value >= 0) {
        item["minecraft:item"].components["minecraft:fertilizer"] = {};
        item["minecraft:item"].components["minecraft:fertilizer"].duration = parseInt(fertilizer.value);
    };

    if (ignPerms.checked) {
        item["minecraft:item"].components["minecraft:ignores_permission"] = ignPerms.checked;
    };

    if (miningSpeed.value !== "" && miningSpeed.value >= 0) {
        item["minecraft:item"].components["minecraft:mining_speed"] = parseInt(miningSpeed.value);
    };

    if (liquidClipped.checked) {
        item["minecraft:item"].components["minecraft:liquid_clipped"] = liquidClipped.checked;
    };

    if (!shouldDespawn.checked) {
        item["minecraft:item"].components["minecraft:should_despawn"] = shouldDespawn.checked;
    };

    if (mirroredArt.checked) {
        item["minecraft:item"].components["minecraft:mirrored_art"] = mirroredArt.checked;
    };

    if (projectileCheckbox.checked) {
        projectilePanel.style.display = "block";

        item["minecraft:item"].components["minecraft:projectile"] = {};

        if (projectileEntity.value !== "") {
            item["minecraft:item"].components["minecraft:projectile"].projectile_entity = projectileEntity.value;
        };
        if (projectilePower.value !== "" && projectilePower.value >= 0) {
            item["minecraft:item"].components["minecraft:projectile"].minimum_critical_power = parseFloat(projectilePower.value);
        };
    } else {
        projectilePanel.style.display = "none";
    };

    if (dyeCheckbox.checked) {
        dyePowder.disabled = false;
        item["minecraft:item"].components["minecraft:dye_powder"] = {};
        item["minecraft:item"].components["minecraft:dye_powder"].color = dyePowder.value;
    } else {
        dyePowder.disabled = true;
    };

    if (throwableCheckbox.checked) {
        throwablePanel.style.display = "block";

        item["minecraft:item"].components["minecraft:throwable"] = {};

        item["minecraft:item"].components["minecraft:throwable"].do_swing_animation = throwableSwing.checked;
        if (throwableDraw.value >= 0 && throwableDraw.value !== "") {
            item["minecraft:item"].components["minecraft:throwable"].max_draw_duration = parseFloat(throwableDraw.value);
        };
        item["minecraft:item"].components["minecraft:throwable"].scale_power_by_draw_duration = throwablePower.checked;
    } else {
        throwablePanel.style.display = "none";
    };

    if ((knockbackResis.value >= 0 && knockbackResis.value <= 1.0) && knockbackResis.value !== "") {
        item["minecraft:item"].components["minecraft:knockback_resistance"] = {};
        item["minecraft:item"].components["minecraft:knockback_resistance"].protection = parseFloat(knockbackResis.value);
    };

    if (fuel.value !== "" && fuel.value >= 0) {
        item["minecraft:item"].components["minecraft:fuel"] = {};
        item["minecraft:item"].components["minecraft:fuel"].duration = parseFloat(fuel.value);
    };

    if (recordCheckbox.checked) {
        recordPanel.style.display = "block";

        item["minecraft:item"].components["minecraft:record"] = {};

        if (recordSound.value !== "") {
            item["minecraft:item"].components["minecraft:record"].sound_event = recordSound.value;
        };
        if (recordDuration.value !== "" && recordDuration.value >= 0) {
            item["minecraft:item"].components["minecraft:record"].duration = parseInt(recordDuration.value);
        };
        if (recordSignal.value !== "" && (recordSignal.value >= 0 && recordSignal.value <= 15)) {
            item["minecraft:item"].components["minecraft:record"].comparator_signal = parseInt(recordSignal.value);
        };
    } else {
        recordPanel.style.display = "none";
    };
    // code output
    code.value = JSON.stringify(item, null, 2);


    copy.onclick = function () {
        code.select();
        code.setSelectionRange(0, code.value.length);
        document.execCommand("copy");
    };
    download.onclick = function () {
        let itemCode = code.value;
        let textFileAsBlob = new Blob([itemCode], {
            type: 'text/plain'
        });
        let downloadLink = document.createElement("a");
        downloadLink.download = `${identifier.value.split(":")[1].toLowerCase()}.item.json`;
        downloadLink.innerHTML = "Save";
        if (window.webkitURL != null) {
            downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
        } else {
            downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
            downloadLink.onclick = destroyClickedElement;
            downloadLink.style.display = "none";
            document.body.appendChild(downloadLink);
        };
        downloadLink.click();
    };

    if (itemIconFile.files.length > 0) {
        downloadPack.disabled = false;
        let fileReader = new FileReader();
        fileReader.onload = function (data_url) {
            itemIcon.src = data_url.target.result;
        };
        fileReader.readAsDataURL(itemIconFile.files[0]);

        const uuid = new uuid_generator_class();
        // setup ZIP
        var zip = new JSZip;
        genManifest(uuid);
        var { rp, bp } = genManifest(uuid);

        zip.file("resource/manifest.json", JSON.stringify(rp, null, 2));
        zip.file("behavior/manifest.json", JSON.stringify(bp, null, 2));
        zip.file(`behavior/items/${identifier.value.split(":")[1].toLowerCase()}.item.json`, code.value);
        zip.file("resource/textures/item_texture.json", document.getElementById("item.atlas").value);
        zip.file(`resource/${icon.value.toLowerCase()}.png`, itemIconFile.files[0]);

        downloadPack.onclick = function () {
            zip.generateAsync({
                type: "blob"
            }).then(function (blob) {
                if (identifier.value !== "") {
                    saveAs(blob, `${identifier.value.split(":")[1].toLowerCase()}.mcaddon`);
                } else {
                    saveAs(blob, "item.mcaddon");
                };
            }, function (err) {
                console.log(err);
            });
        };
    } else {
        downloadPack.disabled = true;
    };

    if (is_valid_identifier(identifier.value) && (identifier.value.split(":")[1] !== "" && identifier.value.split(":")[0] !== "") && (document.getElementById("item.atlas").value !== "" && icon.value !== "" && document.getElementById("enable.item_atlas").value !== "")) {
        document.getElementById("item.pack").disabled = false;
    } else {
        document.getElementById("item.pack").disabled = true;
        $('#pack').collapse('hide');
    };

    function genManifest(uuid) {
        var bp = {};
        var rp = {};
        bp.format_version = 2;
        rp.format_version = 2;
        bp.header = {};
        rp.header = {};
        bp.header.name = "Item behaviorpack";
        rp.header.name = "Item resourcepack";
        bp.header.description = "Behavior pack required for the item to work, generated using https://tools.pixelpoly.co/item-generator";
        rp.header.description = "Resource pack required for the item to work, generated using https://tools.pixelpoly.co/item-generator";
        bp.header.uuid = uuid.generate_uuid();
        rp.header.uuid = uuid.generate_uuid();
        bp.header.version = [0, 0, 1];
        rp.header.version = [0, 0, 1];
        bp.header.min_engine_version = [1, 16, 0];
        rp.header.min_engine_version = [1, 16, 0];
        bp.modules = [{}];
        rp.modules = [{}];
        bp.modules[0].type = "data";
        rp.modules[0].type = "resources";
        bp.modules[0].uuid = uuid.generate_uuid();
        rp.modules[0].uuid = uuid.generate_uuid();
        bp.modules[0].version = [0, 0, 1];
        rp.modules[0].version = [0, 0, 1];
        bp.dependencies = [{}];
        rp.dependencies = [{}];
        bp.dependencies[0].uuid = rp.header.uuid;
        rp.dependencies[0].uuid = bp.header.uuid;
        bp.dependencies[0].version = rp.header.version;
        rp.dependencies[0].version = bp.header.version;
        return { rp, bp };
    };
};
writeItem();
