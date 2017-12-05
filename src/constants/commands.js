var commands = [];

commands[0x8000] = "getVersion";
commands[0x8001] = "log";
commands[0x8010] = "version";
commands[0x8102] = "attribute_report";
commands[0x004d] = "device_announce";
commands[0x8702] = "aps_data_confirm_fail";
commands[0x8101] = "default_response";
commands[0x8045] = "active_endpoints_response";
commands[0x8043] = "simple_descriptor_response";
commands[0x0000] = "int32";
commands[0x0000] = "enum8";
commands[0x0000] = "string";

module.exports = commands;

/*

	if ($_POST['getVersion']=="Version")
	{
		sendCmd("0x0010","0000","");
	}
	elseif ($_POST['SetMaskBtn']=="ok")
	{
		sendCmd("0x0021","0004","00000800");
	}elseif ($_POST['startNetwork']=="StartNetwork")
	{	
		sendCmd("0x0024","0000","");
	
	}elseif ($_POST['scan']=="Scan")
	{
		sendCmd("0x0025","0000",""); 
				
	}elseif ($_POST['reset']=="Reset")
	{	
		sendCmd("0x0011","0000","");
	
	}elseif ($_POST['getStatut']=="Statut")
	{
		sendCmd("0x0014","0000","");
	}elseif ($_POST['SetPermit']=="Inclusion")
	{
		sendCmd("0x0049","0004","FFFC1E"); //1E = 30 secondes
				
	}elseif ($_POST['erase']=="Erase")
	{
		sendCmd("0x0012","0000","");
				
	}elseif (!empty($_POST['activereq']))
	{
		if (!empty($_POST['addressAR']) && (strlen($_POST['addressAR'])==4))
		{
			sendCmd("0x0045","0002",$_POST['addressAR']);
		}else{
			echo "error parameter";
		}
				
	}elseif (!empty($_POST['simplereq']))
	{
		if (!empty($_POST['addressSR']) && (strlen($_POST['addressSR'])==4)&& (strlen($_POST['endpointSR'])==2)&& (!empty($_POST['endpointSR'])))
		{
			
			sendCmd("0x0043","0003",$_POST['addressSR'].$_POST['endpointSR']);
		}else{
			echo "error parameters";
		}
				
	}elseif (!empty($_POST['onoff']))
	{
		if (!empty($_POST['addressOnOff']) && (strlen($_POST['addressOnOff'])==4)&& (strlen($_POST['endpointOnOff'])==2)&& (!empty($_POST['endpointOnOff'])))
		{
			sendCmd("0x0092","0006","02".$_POST['addressOnOff']."01".$_POST['endpointOnOff'].$_POST['action']);
		}else{
			echo "error parameters";
		}
				
	}
*/